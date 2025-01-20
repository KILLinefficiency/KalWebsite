<script>
    import Blogs from "$lib/data/blogs.js";
    import BlogEntry from "$lib/components/BlogEntry.svelte";
</script>

<style>
    .main {
        overflow: auto;
        margin-top: 3vh;
        height: 90vh;
        scrollbar-width: none;
    }
    .entries {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 20px;
    }
</style>

<div class = "main">
    <div class = "entries">
        {#each Blogs as blog, index}
            <BlogEntry {blog} last={index == Blogs.length - 1} />
        {/each}
    </div>
</div>