

export default function Footer()
{
    return (
        <footer>
            <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
                <p style={{ margin: 0 }}>© {new Date().getFullYear()} SkateApp</p>
                <p style={{ margin: '0.25rem 0 0' }}>Built with wheels, coffee, and duct tape 🛹</p>
                <small style={{ display: 'block', marginTop: '0.5rem' }}>Tip: always wax the curb before a trick.</small>
            </div>
        </footer>
    )
}