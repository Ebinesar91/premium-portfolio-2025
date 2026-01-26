import { createClient } from '@supabase/supabase-js'

export function initSupabase() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    // If no credentials, we log a warning but don't crash
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase credentials not found. Contact form will not work.');
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const btn = form.querySelector('button');

            btn.disabled = true;
            btn.innerHTML = 'Sending...';

            try {
                const { error } = await supabase
                    .from('messages') // Assumes a 'messages' table exists
                    .insert([{ name, email, message }]);

                if (error) throw error;

                status.innerHTML = '<p style="color: #00f0ff; margin-top: 10px;">Message sent successfully!</p>';
                form.reset();
            } catch (error) {
                console.error('Error submitting form', error);
                status.innerHTML = '<p style="color: #ff0055; margin-top: 10px;">Error sending message. Please try again.</p>';
            } finally {
                btn.disabled = false;
                btn.innerHTML = 'Send Message';
            }
        });
    }
}
