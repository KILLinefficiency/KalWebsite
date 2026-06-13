<style>
    @keyframes glow {
        from {
            opacity: 0%;
            filter: drop-shadow(0px 0px 0rem rgb(255, 217, 0));
            transform: scale(0.5);
        }
        to {
            opacity: 100%;
            filter: drop-shadow(0px 0px 100px rgb(255, 217, 0));
            transform: scale(1);
        }
    }

    @media screen and (max-width: 1000px) {
        @keyframes glowMobile {
            from {
                opacity: 0%;
                filter: drop-shadow(0px 0px 0rem rgb(255, 217, 0));
                transform: scale(0.1);
            }
            to {
                opacity: 100%;
                filter: drop-shadow(0px 0px 100px rgb(255, 217, 0));
                transform: scale(0.6);
            }
        }
    }

    img {
        animation: glow 5s forwards;
    }

    @media screen and (max-width: 1000px) {
        img {
            animation: glowMobile 5s forwards;
        }
    }
</style>

<img src="/logo.svg" alt="Kal Logo" />