<script>
    import Logo from "$lib/components/Logo.svelte";

    let current = 1;
    let total = 3;
    function setNext() {
        if(current === total) current = 1;
        else current++;
    }
</script>

<style>
    .main {
        height: 90vh;
        margin: 0px;
        padding: 0px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        justify-content: center;
    }
    .title {
        font-size: 250px;
        margin: 0px;
    }
    .line {
        font-size: 50px;
    }

    .container {
        height: calc(100vh);
    }

    .alt {
        background-color: var(--base);
    }

    .heading {
        font-size: 50px;
        font-weight: bold;
        padding: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .heading p {
        margin: 0px;
    }

    .scroll {
        position: fixed;
        bottom: 25px;
        right: 50px;
        font-size: 20px;
        padding: 12px 24px;
        border-radius: 40px;
    }
    .scroll a {
        text-decoration: none;
        color: var(--fg);
    }
    .scroll a:hover {
        font-weight: bold;
        color: var(--green);
    }

    @media screen and (max-width: 1000px) {
        .main {
            width: 100vw;
            height: 85vh;
        }
        .title {
            font-size: 100px;
        }
        .line {
            font-size: 20px;
        }
    }
</style>

<svelte:head>
    <title>Home | Kal</title>
</svelte:head>

<p class = "scroll">
    <a href={"#" + String(current)} onclick={setNext}>
        Scroll
    </a>
</p>

<div class = "main">
    <p class = "title">Kal</p>
    <p class = "line">A general purpose programming language!</p>
</div>

<div id = "2" class = "container alt">
    <div class = "heading">
        <p>Features</p>
    </div>
</div>

<div id = "3" class = "container">
    <div class = "heading">
        <p>Features</p>
    </div>
</div>