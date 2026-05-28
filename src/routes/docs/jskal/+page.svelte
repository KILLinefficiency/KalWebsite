<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Card from "$lib/components/Card.svelte";
    import Fence from "$lib/components/Fence.svelte";
</script>

<style>
    a {
        font-size: 20px;
        font-weight: bold;
        color: var(--blue);
        text-decoration: none;
    }
</style>

<Content title="JSKal" desc="It can do that... again!?" next="/docs" previous="/docs">
    You embed Kal with C++, then with Python. And guess what? You can do it with JavaScript as well!

    <br /><br />
    JSKal is the official JavaScript package that provides bindings for JavaScript to communicate with libkal.
    JSKal binds your JavaScript program with <Fence>libkal.so</Fence> to allow execution of Kal code right inside your application.

    <br /><br />
    JSKal officially supports two JavaScript runtimes:
    <ul>
        <li><a href="https://deno.com/" target="_blank">Deno</a></li>
        <li><a href="https://bun.sh/" target="_blank">Bun</a></li>
    </ul>

    The same package is supported across two different JS runtimes.
    You can set up JSKal with both Deno and Bun in a few initial steps.
    Although both of these runtimes use TypeScript by default, we'll use JavaScript for our examples.
    You can continue with TypeScript if you wish.

    <Code
        lang="bash"
        code={[
            "$ deno init testJSKal",
            "$ cd tesJSKal",
            "$ rm *ts* # skip if you wish to proceed with TS",
            "$ deno install npm:jskal"
        ]}
    />

    Check <Fence>deno.json</Fence> to verify installation.

    <br /><br />
    For Bun...

    <Code
        lang="bash"
        code={[
            "$ bun init testJSKalAgain",
            "$ cd testJSKalAgain",
            "$ rm *ts* # skip if you wish to proceed with TS",
            "$ bun install jskal"
        ]}
    />

    Check <Fence>package.json</Fence> to verify installation.

</Content>