<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Fence from "$lib/components/Fence.svelte";
    import Table from "$lib/components/Table.svelte";
    import Card from "$lib/components/Card.svelte";
</script>

<Content title="Built-ins" desc="Batteries included!" previous="/docs/expressions" next="/docs/control">
    Kal does not come with a separate standard library. Rather, everything is intrinsic to the interpreter. This chapter covers general intrinsics.

    <br /><br />
    Kal exposes a global <Fence>ARGS</Fence> list variable that contains all the command line arguments. Command line arguments are additional pieces of information passed to the interpreter while passing the program.

    <Code
        lang="kal"
        caption="args.kal"
        code={[
            "stdout ARGS \"\\n\"."
        ]}
    />

    <Code
        lang="bash"
        code={[
            "$ kal args.kal sun earth moon"
        ]}
        output={"[\"kal\", \"args.kal\", \"sun\", \"earth\", \"moon\"]"}
    />

    Arguments can be extracted from <Fence>ARGS</Fence> as you would from a normal list.

    <Code
        lang="kal"
        caption="args.kal"
        code={[
            "stdout ARGS[3] \"\\n\"."
        ]}
    />

    <Code
        lang="bash"
        code={[
            "$ kal args.kal sun earth moon"
        ]}
        output={"earth"}
    />

    You can make Kal programs end early using the <Fence>exit</Fence> statement.

    <Code
        lang="kal"
        caption="exit.kal"
        code={[
            "exit 100.",
            "stdout \"Won't run!\"."
        ]}
    />

    <Code
        lang="bash"
        code={[
            "$ kal exitCode.kal",
            "$ echo $?"
        ]}
        output={"100"}
    />

    Text can be colorized using the <Fence>style</Fence> statement. It accepts color, mode or a combination of both.
    
    <Code
        lang="kal"
        caption="color.kal"
        code={[
            "style \"red\" \"bold\".",
            "stdout \"Text in red!\\n\"."
        ]}
    />

    Valid colors and modes are:
    <Table
        header={["Colors", "Modes"]}
        rows={[
            ["black", "bold"],
            ["red", "italic"],
            ["green", "underline"],
            ["yellow", "blink"],
            ["blue", "bg"],
            ["magenta", "strike"],
            ["cyan", "reset"],
            ["white", ""]
        ]}
    />

    <br />
    Use <Fence>"reset"</Fence> to go back to default.

    <Code
        lang="kal"
        caption="reset.kal"
        code={[
            "style \"reset\"."
        ]}
    />

    Kal comes with statements for working with lists and dictionaries. Those are documented as follows.

    <br /><br />
    Add a new element to a list using the <Fence>push</Fence> statement.

    <Code
        lang="kal"
        caption="push.kal"
        code={[
            "var data = [1, 2, 3].",
            "stdout \"Before: \" data \"\\n\".\n",
            "push data 4.",
            "stdout \"After: \" data \"\\n\"."
        ]}
        output={"Before: [1, 2, 3]\nAfter: [1, 2, 3, 4]"}
    />

    By default Kal will push an element to the end of the list. Optionally provide the index where you want to push the element to as the third argument.

    <Code
        lang="kal"
        caption="pushIndex.kal"
        code={[
            "var data = [1, 2, 3].",
            "stdout \"Before: \" data \"\\n\".\n",
            "push data 4 1.",
            "stdout \"After: \" data \"\\n\"."
        ]}
        output={"Before: [1, 2, 3]\nAfter: [1, 4, 2, 3]"}
    />

    Fetch the first element of a list using the <Fence>first</Fence> statement.

    <Code
        lang="kal"
        caption="first.kal"
        code={[
            "var data = [\"x\", \"y\", \"z\"].",
            "first data -> f.",
            "stdout \"First: \" f \"\\n\"."
        ]}
        output={"First: x"}
    />

    Fetch the last element of a list using the <Fence>last</Fence> statement.

    <Code
        lang="kal"
        caption="last.kal"
        code={[
            "var data = [\"x\", \"y\", \"z\"].",
            "last data -> l.",
            "stdout \"Last: \" l \"\\n\"."
        ]}
        output={"Last: z"}
    />

    Remove the last element of the list using the <Fence>pop</Fence> statement.

    <Code
        lang="kal"
        caption="pop.kal"
        code={[
            "var data = [1, 2, 3].",
            "stdout \"Before: \" data \"\\n\".\n",
            "pop data.",
            "stdout \"After: \" data \"\\n\"."
        ]}
        output={"Before: [1, 2, 3]\nAfter: [1, 2]"}
    />

    Remove the first element of the list using the <Fence>popFirst</Fence> statement.

    <Code
        lang="kal"
        caption="popFirst.kal"
        code={[
            "var data = [1, 2, 3].",
            "stdout \"Before: \" data \"\\n\".\n",
            "popFirst data.",
            "stdout \"After: \" data \"\\n\"."
        ]}
        output={"Before: [1, 2, 3]\nAfter: [2, 3]"}
    />

    Reverse a list using the reverse statement.
    
    <Code
        lang="kal"
        caption="reverse.kal"
        code={[
            "var data = [1, 2, 3].",
            "stdout \"Before: \" data \"\\n\".\n",
            "reverse data.",
            "stdout \"After: \" data \"\\n\"."
        ]}
        output={"Before: [1, 2, 3]\nAfter: [3, 2, 1]"}
    />

    Concatenate lists using the <Fence>extend</Fence> statement.

    <Code
        lang="kal"
        caption="extend.kal"
        code={[
            "var listX = [1, 2, 3],",
            "    listY = [4, 5, 6].\n",
            "extend listX listY -> listZ.",
            "stdout listZ \"\\n\"."
        ]}
        output={"[1, 2, 3, 4, 5, 6]"}
    />

    Flatten nested lists into a linear list using the <Fence>flat</Fence> statement.

    <Code
        lang="kal"
        caption="flat.kal"
        code={[
            "var data = [",
            "    [1, 2, 3],",
            "    [4, 5, 6]",
            "].\n",
            "flat data -> line.",
            "stdout line \"\\n\"."
        ]}
        output={"[1, 2, 3, 4, 5, 6]"}
    />

    There could be many levels of list nesting, simple invocation of the <Fence>flat</Fence> statement only removed the top level
    Pass in the number of levels you want to resolve in case of deeply nested lists.

    <Code
        lang="kal",
        caption="flatLevels.kal"
        code={[
            "var data = [",
            "    [1, [2, 3]],",
            "    [4, [5, 6]]",
            "].\n",
            "flat data -> line.",
            "stdout \"First Level: \" line \"\\n\".\n",
            ";; resolve of 2 levels",
            "flat data 2 -> secondLine.",
            "stdout \"Second Level: \" secondLine \"\\n\".",
        ]}
        output={"First Level: [1, [2, 3], 4, [5, 6]]\nSecond Level: [1, 2, 3, 4, 5, 6]"}
    />

    For a dictionary, use the <Fence>keys</Fence> statement to obtain a list of all keys.

    <Code
        lang="kal"
        caption="keys.kal"
        code={[
            "var planet = #(",
            "    name -> \"Earth\",",
            "    is -> \"Planet\"",
            ").\n",
            "keys planet -> dictKeys.",
            "stdout \"Keys = \" dictKeys \"\\n\""
        ]}
        output={"Keys = [\"name\", \"is\"]"}
    />

    Similarly, use the <Fence>values</Fence> statement to obtain a list of all values.

    <Code
        lang="kal"
        caption="values.kal"
        code={[
            "var planet = #(",
            "    name -> \"Earth\",",
            "    is -> \"Planet\"",
            ").\n",
            "values planet -> dictValues.",
            "stdout \"Values = \" dictValues \"\\n\"."
        ]}
        output={"Values = [\"Earth\", \"Planet\"]"}
    />

    To obtain combined key-value pairs, use the <Fence>items</Fence> statement.

    <Code
        lang="kal"
        caption="items.kal"
        code={[
            "var planet = #(",
            "    name -> \"Earth\",",
            "    is -> \"Planet\"",
            ").\n",
            "items planet -> dictItems.",
            "stdout \"Items = \" dictItems \"\\n\"."
        ]}
        output={"Items = [[\"name\", \"Earth\"], [\"is\", \"Planet\"]]"}
    />

    Check whether a key exists or not in a dictionary using the <Fence>exists</Fence> statement.

    <Code
        lang="kal"
        caption="items.kal"
        code={[
            "var planet = #(",
            "    name -> \"Earth\",",
            "    is -> \"Planet\"",
            ").\n",
            "exists planet \"name\" -> x.",
            "exists planet \"biomes\" -> y\n",
            "stdout \"Name? \" x \"\\n\"",
            "    \"Biomes? \" y \"\\n\"."
        ]}
        output={"Name? 1\nBiomes? 0"}
    />

    Update an existing dictionary using the <Fence>update</Fence> statement.
    <Fence>update</Fence> takes in another dictionary and patches it over the original one.
    This adds or updates values in the original dictionary.


    <Code
        lang="kal"
        caption="update.kal"
        code={[
            "var planet = #(",
            "    name -> \"Earth\",",
            "    is -> \"Planet\"",
            ").\n",
            "var planetPatch = #(",
            "    name -> \"Home\",",
            "    biomes -> [\"Forest\", \"Ocean\"]",
            ").\n",
            "update planet planetPatch -> final.",
            "stdout final \"\\n\"."
        ]}
        output={"#(name -> \"Home\", is -> \"Planet\", biomes -> [\"Forest\", \"Ocean\"])"}
    />

    <Card>
        Throughout the examples we used lists and dictionaries as variables.
        However, you can also pass them to these statements as literals.
    </Card>


</Content>