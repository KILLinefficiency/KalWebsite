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

    @media screen and (max-width: 1000px) {
        a {
            font-size: 15px;
        }
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
            "$ bun install jskal"
        ]}
    />

    Check <Fence>package.json</Fence> to verify installation.

    <br /><br />
    Remove existing Typescript files if you wish to proceed with JavaScript.

    <Code
        lang="bash"
        code={["$ rm *ts*"]}
    />

    Let's write a simple program with each.

    <br /><br />
    With Deno…

    <Code
        lang="js"
        caption="index.js"
        code={[
            "import Kal from 'npm:jskal';\n",
            "const kal = new Kal();",
            "kal.exec('stdout \"Hello JSKal\\n\".');\n",
            "kal.close();"
        ]}
        output={"Hello JSKal"}
    />

    Run with:
    <Code
        lang="bash"
        code={["$ deno run --allow-ffi index.js"]}
    />

    With Bun…

    <Code
        lang="js"
        caption="index.js"
        code={[
            "import Kal from 'npm:jskal';\n",
            "const kal = new Kal();",
            "kal.exec('stdout \"Hello JSKal\\n\".');\n",
            "kal.close();"
        ]}
        output={"Hello JSKal"}
    />

    Run with:
    <Code
        lang="bash"
        code={["$ bun run index.js"]}
    />

    Notice how JSKal code for both Deno and Bun is exactly the same except for the <Fence>npm</Fence> label before the package name during import in Deno.

    <br /><br />
    JSKal is an ES6 package and maintains complete cross compatibility for both of these runtimes. This chapter follows JSKal examples with Deno, but feel free to use Bun if that's your preference.

    <br /><br />
    Deno prioritizes security, therefore you are required to pass the <Fence>--allow-ffi</Fence> flag before execution.
    It provides Deno explicit permission to communicate with <Fence>libkal.so</Fence>.

    <Card>
        JSKal is not a reimplementation of Kal in JavaScript. It is rather an abstraction that utilizes Foreign Function Interface (FFI) to interact directly with <Fence>libkal.so</Fence> to execute Kal code.
    </Card>

    Every Kal instance reads the <Fence>libkal.so</Fence> file. As per default installation, it reads the file at: <Fence>/usr/local/lib/libkal.so</Fence>.
    If you have installed <Fence>libkal.so</Fence> elsewhere or are using a custom build, pass the correct absolute path to the constructor of the Kal class to override the default path.

    <Code
        lang="js"
        caption="customPath.js"
        code={[
            "import Kal from 'npm:jskal';\n",
            "const kal = new Kal('/home/me/Kal/bin/libkal.so');",
            "kal.exec('stdout \"Hello JSKal\\n\".');\n",
            "kal.close();"
        ]}
        output={"Hello JSKal"}
    />
</Content>