<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Fence from "$lib/components/Fence.svelte";
    import Card from "$lib/components/Card.svelte";
</script>

<Content title="Serialization" desc="Defalte & Inflate" next="/docs" previous="/docs">
    All of your data resides in memory during execution. Once your program concludes, the data is lost.

    <br /><br />
    Serializing data to disk preserves its structure to be used later. Multiple programs can access the same information from disk.
    Kal embeds extra information in binary form so that it can be read more efficiently.

    <br /><br />
    Values of any of the 5 primitive types can be serialized using the <Fence>binWrite</Fence> statement.

    <Code
        lang="kal"
        caption="serialize.kal"
        code={[
            "var data = \"Secret\".",
            "binWrite data \"file.bin\"."
        ]}
    />

    A file named <Fence>file.bin</Fence> should appear in your directory.
    Use <Fence>binRead</Fence> to deserialize the file back into a variable.

    <Code
        lang="kal"
        caption="deserialize.kal"
        code={[
            "binRead \"file.bin\" -> value.",
            "stdout value \"\\n\"."
        ]}
        output={"Secret"}
    />

    You can serialize complex information to a binary file.
    
    <Code
        lang="kal"
        caption="writeEarth.kal"
        code={[
            "var data = #(",
            "    name -> \"Earth\",",
            "    category -> \"Planet\",",
            "    moon -> 1,",
            "    biomes -> [",
            "        \"Desert\",",
            "        \"Forests\",",
            "        \"Mountains\",",
            "        \"Oceans\"",
            "    ],",
            "    aliens -> null",
            ").\n",
            "binWrite data \"earth.bin\"."
        ]}
    />

    Deserialize it back:

    <Code
        lang="kal"
        caption="readEarth.kal"
        code={[
            "binRead \"earth.bin\" -> data.",
            "stdout data \"\\n\"."
        ]}
        output={"#(name -> \"Earth\", category -> \"Planet\", moon -> 1, biomes -> [\"Desert\", \"Forests\", \"Mountains\", \"Oceans\"], aliens -> null)"}
    />

    Kal takes serialization further allowing you to serialize your programs into special files called KAST (Kal Abstract Syntax Tree) files.

    <br /><br />
    A KAST file is a single bundle of your entire project. It preserves the parsed code, preprocesses imported source files all in one single distributable file.

    <br /><br />
    Consider the following code example which revisits the greet function:

    <Code
        lang="kal"
        caption="lib.kal"
        code={[
            "fn greet -> name {",
            "    stdout \"Hello \" name \"\\n\".",
            "}"
        ]}
    />

    <Code
        lang="kal"
        caption="main.kal"
        code={[
            "@lib\n",
            ":greet \"Earth\"."
        ]}
        output={"Hello Earth"}
    />

    The following example is made up of two files: <Fence>lib.kal</Fence> and <Fence>main.kal</Fence> with <Fence>main.kal</Fence> being the entry point.
    While distribution, you'll always be required to pair these files together keeping the folder structure intact. One cannot run without the other. You may also have third party packages included in your project.

    <br /><br />
    You can easily generate a single, bundled and distributable KAST file using the <Fence>-k</Fence> flag.

    <Code
        lang="bash"
        code={[
            "$ kal -k main.kal"
        ]}
    />

    This produces a <Fence>main.kast</Fence> file in the same folder. Run the KAST file like any other Kal program.

    <Code
        lang="bash"
        code={[
            "$ kal main.kast"
        ]}
        output={"Hello Earth"}
    />

    Try deleting the <Fence>main.kal</Fence> and <Fence>greet.kal</Fence> files. <Fence>main.kast</Fence> will still execute since it's now independent of the original source code.

    <br /><br />
    You can produce a KAST file with some other name by pairing the <Fence>-k</Fence> flag with the <Fence>-o</Fence> flag.

    <Code
        lang="bash"
        code={[
            "$ kal -k main.kal -o project",
            "$ kal project.kast"
        ]}
        output={"Hello Earth"}
    />

    <Card>
        Never manually modify a generated KAST file. Kal can fail at executing a KAST file with modified encoding.
    </Card>


</Content>