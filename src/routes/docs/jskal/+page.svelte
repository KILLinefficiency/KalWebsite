<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Card from "$lib/components/Card.svelte";
    import Fence from "$lib/components/Fence.svelte";
    import Table from "$lib/components/Table.svelte";
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
            "$ cd testJSKal",
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
            "import Kal from 'jskal';\n",
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
            "import Kal from 'jskal';\n",
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

    Notice how JSKal code for both Deno and Bun is exactly the same.
    JSKal is an ES6 package and maintains complete cross compatibility for both of these runtimes.

    <br /><br />
    Deno prioritizes security, therefore you are required to pass the <Fence>--allow-ffi</Fence> flag before execution.
    It provides Deno explicit permission to communicate with <Fence>libkal.so</Fence>.

    <br /><br />
    In the Deno example, you can add an explicit <Fence>npm</Fence> label before the package name during import.
    <Code
        lang="js"
        code={["import Kal from 'npm:jskal';"]}
    />

    <br />
    <Card>
        JSKal is not a reimplementation of Kal in JavaScript. It is rather an abstraction that utilizes Foreign Function Interface (FFI) to interact directly with <Fence>libkal.so</Fence> to execute Kal code.
    </Card>

    <br />
    Every Kal instance reads the <Fence>libkal.so</Fence> file. As per default installation, it reads the file at: <Fence>/usr/local/lib/libkal.so</Fence>.
    If you have installed <Fence>libkal.so</Fence> elsewhere or are using a custom build, pass the correct absolute path to the constructor of the Kal class to override the default path.

    <Code
        lang="js"
        caption="customLibKal.js"
        code={[
            "import Kal from 'jskal';\n",
            "const kal = new Kal('/home/me/Kal/bin/libkal.so');",
            "kal.exec('stdout \"Hello JSKal\\n\".');\n",
            "kal.close();"
        ]}
        output={"Hello JSKal"}
    />

    To dynamically pass variables to Kal via JavaScript, embed them using the <Fence>$</Fence> symbol and pass values in a JSON object as the second parameter to the <Fence>exec</Fence> method.
    <Code
        lang="js"
        caption="dynVar.js"
        code={[
            "import Kal from 'jskal';\n",
            "const kal = new Kal();\n",
            "kal.exec(",
            "    `\n        stdout ($a + $b) \"\\n\".\n    `,",
            "    {",
            "        a: 45,",
            "        b: 55",
            "    }",
            ");\n",
            "kal.close();"
        ]}
        output={"100"}
    />

    <Fence>`...`</Fence> is JavaScript's way of writing multiline strings.

    <br /><br />
    JSKal also provides a Result object that stores the return values of an executed Kal code snippet.
    The <Fence>{"<-"}</Fence> operator can be used in the Kal code to return a value to the JavaScript host program.

    <Code
        lang="js"
        caption="jskalResult.js"
        code={[
            "import Kal from 'jskal';\n",
            "const kal = new Kal();",
            "const result = kal.exec('<- 125 * 4');\n",
            "console.log(result.display());",
            "console.log(result.toNumber());\n",
            "result.close();",
            "kal.close();"
        ]}
        output={"Result(500)\n500"}
    />

    A <Fence>Result</Fence> object can be previewed by calling the <Fence>display</Fence> method on it.
    The <Fence>toNumber</Fence> method on the object in this case extracts the value by converting it to its equivalent JavaScript type.

    <br /><br />
    <Card>
        Unlike C++ and Python, JavaScript does not support class destructors and operator overloading.
        Therefore, helper methods such as <Fence>display</Fence> are used. Unavailability of destructors requires you to close the Kal and Result objects manually to facilitate memory cleanup.
    </Card>

    <br />
    Similarly, depending on the value you are returning, JSKal provides multiple methods to extract values from the <Fence>Result</Fence> object.

    <br /><br />
    <Table
        header={["Kal Type", "JSKal Method", "JS/TS Type"]}
        rows={[
            ["Numerical", "toNumber()", "number"],
            ["String", "toString()", "string"],
            ["List", "toList()", "Result[]"],
            ["Dict", "toDict()", "{ [key: string]: Result }"],
            ["Null", "toNull()", "boolean"]
        ]}
    />

    <br />
    Complex values such as Arrays and JSON objects can also be passed to the <Fence>exec</Fence> method. JSKal will implicitly convert JS/TS types to Kal types.

    <br /><br />
    A complex value can be converted using <Fence>toList</Fence> or <Fence>toDict</Fence> method. However, this only converts the data itself, not the internal values. Those can be converted implicitly using the appropriate methods.

    <br /><br />
    Consider this Kal code example which accepts an array from JavaScript and returns a list of first, middle and last elements back to JavaScript.

    <Code
        lang="js"
        caption="jskalList.js"
        code={[
            "import Kal from 'jskal';\n",
            "const kal = new Kal();",
            "const result = kal.exec(",
            "    `\n        var data = $data.\n\n        len data -> size.\n        first data -> f.\n        last data -> l.\n        var m = data[(size / 2) as int].\n\n        <- [f, m, l].\n    `",
            "    {",
            "        data: [1, 2, 3, 4, 5]",
            "    }",
            ");\n\n",
            "console.log(result.display());\n",
            "result.toList().forEach((num) => {",
            "    console.log(num.display(), num.toNumber());",
            "});\n",
            "result.close();",
            "kal.close();"
        ]}
        output={"Result([1, 3, 5])\nResult(1) 1\nResult(3) 3\nResult(5) 5"}
    />

    Similar behavior can be observed with dictionaries.

    <Code
        lang="js"
        caption="jskalDict.js"
        code={[
            "import Kal from 'jskal';\n",
            "const kal = new Kal();",
            "const result = kal.exec(",
            "    `\n        var data = $data.\n        <- #(sum -> data[\"x\"] + data[\"y\"]).\n    `,",
            "    {",
            "        data: { x: 75, y: 25 }",
            "    }",
            ");\n",
            "console.log(result.display());\n",
            "const resultObj = result.toDict();",
            "console.log('Sum:', resultObj['sum'].toNumber());\n",
            "result.close();",
            "kal.close();"
        ]}
        output={"Result(#(sum -> 100))\nSum: 100"}
    />

    <Card>
        JSKal binds with <Fence>libkal.so</Fence> dynamically. Therefore, <Fence>libkal.so</Fence> is required during runtime. JSKal programs can't execute without it.
    </Card>

</Content>