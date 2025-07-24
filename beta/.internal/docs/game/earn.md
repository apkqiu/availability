<script setup>
    import { onMounted } from 'vue';
    onMounted(() => {
        
        // add bootstrap js
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js';
        script.crossOrigin = 'anonymous';
        // css too
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css';
        // apply them in app only, which app is an iframe
        // when iframe is loaded, add them
        document.getElementById('app').onload = () => {
            document.getElementById('app').contentWindow.document.head.appendChild(link);
            document.getElementById('app').contentWindow.document.body.appendChild(script);
        }
        // listen to window resize
        window.addEventListener('resize', () => {
            document.getElementById('app').style.height = window.innerHeight + 'px';
        });
        // set iframe height
        document.getElementById('app').style.height = window.innerHeight + 'px';
    });
</script>

<client-only>
    <iframe id="app">
    </iframe>
</client-only>
