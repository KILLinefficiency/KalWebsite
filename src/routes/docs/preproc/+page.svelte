<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Card from "$lib/components/Card.svelte";
    import Fence from "$lib/components/Fence.svelte";
</script>

<Content title="Packages & Preprocessor" desc="It's time to go multi-file!" previous="/docs/scope" next="/docs/serialization">
    At some point, your code is going to grow in size. It's not a good idea to write all of it inside a single file. The Kal Preprocessor allows you to write your code in multiple files and then stitch them together into a single unit during execution.

    <br /> <br />
    You can write modular code that can be imported into multiple files or even multiple projects!

    <br /> <br />
    Use the <Fence>@</Fence> preprocessor directive to include an existing Kal file into your current file. <Fence>@</Fence> directive accepts both relative and absolute path to a file.

    <br /> <br />
    Let's look into an example for clarification

    <Code
        caption="greet.kal"
        code={[
            "fn greet -> name {",
            "    stdout \"Hello \" name \"!\\n\".",
            "}"
        ]}
    />

    This file can be included and used from another Kal file.

    <Code
        caption="main.kal"
        code={[
            "@greet.kal\n",
            ":greet \"World\"."
        ]}
        output="Hello World!"
    />

    <Card>
        The <Fence>.kal</Fence> extension can be omitted while including a file. Try using <Fence>@greet</Fence> instead of <Fence>@greet.kal</Fence>.
    </Card>

    <br />
    If a file is included multiple times, Kal will preprocess the first inclusion only. The subsequent inclusions will be ignored. The Kal interpreter does it to avoid re-declaration errors which commonly occur with multiple inclusions across multiple files.

    <Code
        caption="lib.kal"
        code={[
            "stdout \"Hello \"."
        ]}
    />

    <Code
        caption="main.kal"
        code={[
            "@lib",
            "@lib\n",
            "stdout \"Kal\\n\"."
        ]}
        output={"Hello Kal"}
    />

    <Card>
        The proprocessor directive does not end with a <Fence>.</Fence>
    </Card>

    The best use of the preprocessor outside the internal scope of your project, is including existing projects into your own. The Kal Preprocessor allows you to build reusable packages and use them across multiple projects.
    <br /> <br />
    The preprocessor takes care of path resolution so that you don't have to spend time hard coding the correct relative or absolute path to the library.

    <br /> <br />
    But where do these packages live?

    <br /> <br />
    You are required to set a path to the directory where all the reusable packages live. During execution, Kal will use this path to find these packages.

    <br /> <br />
    The path, called the Kal Package Path, can be set using an environment variable <Fence>KAL_PKG</Fence>. This path can point to any valid directory. For convenience, let's create a directory called <Fence>pkg</Fence> in your home directory.

    <Code
        lang="bash",
        code={[
            "$ mkdir ~/pkg"
        ]}
    />

    Now set <Fence>KAL_PKG</Fence> to point to this directory.

    <Code
        lang="bash"
        code={[
            "$ export KAL_PKG=\"$HOME/pkg\""
        ]}
    />

    You can add this line in your <Fence>.bashrc</Fence> file to skip setting <Fence>KAL_PKG</Fence> for every terminal session.

    <Code
        lang="bash"
        code={[
            "$ echo 'export KAL_PKG=\"$HOME/pkg\"' >> ~/.bashrc"
        ]}
    />

    Follow an equivalent step for your shell if you are not using the Bash Shell.

    <br /> <br />
    Once done, verify by printing the <Fence>KAL_PKG</Fence> environment variable.

    <Code
        lang="bash"
        code={[
            "$ echo $KAL_PKG"
        ]}
        output="/home/user/pkg"
    />

    Let's start by creating a demo package called <Fence>greet</Fence> inside the directory that's set to <Fence>KAL_PKG</Fence>.

    <Code
        lang="bash"
        code={[
            "$ mkdir $KAL_PKG/greet",
            "$ cd $KAL_PKG/greet"
        ]}
    />

    The entry point for every package is the <Fence>main.kal</Fence> file. The resolved package path points to this file.

    <br /> <br/>
    Let's add our greet function inside this <Fence>main.kal</Fence> file.

    <Code
        caption="main.kal"
        code={[
            "fn greet -> name {",
            "    stdout \"Hello \" name \"!\\n\".",
            "}"
        ]}
    />

    This simple package is ready to be used. You can import this package inside any Kal project on your system using the <Fence>@pkg:</Fence> directive.

    Create a Kal file somewhere else to test.

    <Code
        caption="test.kal"
        code={[
            "@pkg:greet\n",
            ":greet \"Kal\"."
        ]}
        output="Hello Kal!"
    />

    <Card>
        A Kal Package itself can constitute multiple files included using the <Fence>@</Fence> directive and other packages included using the <Fence>@pkg:</Fence> directive.
    </Card>

    You can have directories inside Kal packages and each directory acting as a sub-package with its own <Fence>main.kal</Fence>.

    <br /> <br />
    Let's create a sub-package <Fence>greet/another</Fence> inside the <Fence>greet</Fence> package.

    <Code
        lang="bash"
        code={[
            "$ mkdir $KAL_PKG/greet/another"
        ]}
    />

    And add this code to another sub-package's <Fence>main.kal</Fence>.

    <Code
        caption="$KAL_PKG/greet/another/main.kal"
        code={[
            "fn sayHi -> name {",
            "    stdout \"Hi \" name \"!\\n\".",
            "}"
        ]}
    />

    Include the <Fence>another</Fence> sub-package and use <Fence>sayHi</Fence>.

    <Code
        caption="test.kal"
        code={[
            "@pkg:greet/another\n",
            ":sayHi \"Kal\"."
        ]}
        output="Hi Kal!"
    />

    Generally, you would want to use packages developed by other people.
    <Fence>KAL_PKG</Fence> is where you should put them to be globally accessible by any Kal program.

    <br /> <br />
    It's evident now how easy it is to set up a Kal package.
    But that's not all! You can also set up CLI scripts that can be easily used anywhere.
    CLI packages work in the same way except they use cli.kal as their entry point.
    Let's enhance the greet package with a CLI script.

    <br /> <br />
    Create a new file: <Fence>$KAL_PKG/greet/cli.kal</Fence>.

    <Code
        caption="$KAL_PKG/greet/cli.kal"
        code={[
            "@main\n",
            ":greet ARGS[2]."
        ]}
    />

    This CLI script makes use of the existing greet function to demonstrate its functionality.
    It can be invoked externally using the Kal interpreter.

    <Code
        lang="bash"
        code={[
            "$ kal -x greet Friend"
        ]}
        output="Hi Friend!"
    />

    Here:
    <ul>
        <li><Fence>-x</Fence> flag denotes script invocation.</li>
        <li><Fence>greet</Fence> is the CLI Package name.</li>
        <li><Fence>Friend</Fence> is a command-line argument.</li>
    </ul>

    <Card>
        A CLI Package can accept multiple command-line arguments.
    </Card>

    Like Kal Packages, a CLI Package can also have CLI sub-packages.
    A Kal Package can also be a CLI package and vice-versa.

</Content>