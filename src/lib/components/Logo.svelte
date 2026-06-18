<script>
    import { base } from "$app/paths";
</script>
<style>
    @keyframes grow {
        from {
            opacity: 0%;
            height: 32px;
            width: 32px;
        }
        to {
            opacity: 100%;
            height: 64px;
            width: 64px;
        }
    }

    img {
        animation: grow 5s forwards;
    }
</style>

<img src="{base}/logo.svg" alt="Kal Logo" />