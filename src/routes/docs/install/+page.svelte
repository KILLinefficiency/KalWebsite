<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Card from "$lib/components/Card.svelte";
</script>

<Content title="Install Kal" desc="...or rather compile it from source" next="/docs" previous="/docs/">
    Kal has no third-party dependency, hence it's very convenient to compile it from the source code. Kal uses a build script to manage every aspect of compilation and installation including the Kal interpreter, tests and libkal.
    <br /> <br />
    Please note that Kal compilation and installation is tested on Linux and therefore this document highlights installation on Linux only. Installation on macOS should be similar. Windows users are recommended to use Windows Subsystem for Linux (WSL).

    <br /> <br />
    Make sure you have required Linux utilities installed/updated before compiling Kal.

    <Code
        lang="bash"
        code={[
            "$ sudo apt install \\",
            "    git bash gcc g++ -y"
        ]}
    />

    <ol>
        <li>
            Clone the Kal repository. Shallow clone for faster download.
            <Code
                lang="bash"
                code={[
                    "$ git clone --depth=1 \\",
                    "    https://www.github.com/KILLinefficiency/Kal"
                ]}
            />
        </li>

        <li>
            Optionally run tests to make sure the latest code is stable.
            <Code
                lang="bash"
                code={
                    ["$ ./build.sh test"]
                }
            />
        </li>

        <li>
            Compile the Kal interpreter. This will put the compiled binary in the ./bin folder.
            <Code
                lang="bash"
                code={
                    ["$ ./build.sh compile"]
                }
            />
        </li>

        <li>
            Build libkal. This will put libkal and the associated files in the ./bin folder.
            <Code
                lang="bash"
                code={
                    ["$ ./build.sh embed"]
                }
            />
        </li>

        <li>
            You can choose to install Kal and libkal on your system directly. [Recommended]
            <Code
                lang="bash"
                code={
                    ["$ ./build.sh install"]
                }
            />

            This installs:
            <ul>
                <li>the Kal interpreter in the /usr/local/bin/ directory.</li>
                <li>libkal (libkal.a) in the /usr/local/lib/ directory.</li>
                <li>libkal (libkal.so) in the /usr/local/lib directory.</li>
            </ul>

            <Card>
                Running ./build.sh install will prompt for password via sudo for installing the mentioned files to the appropriate location.
            </Card>
        </li>
    </ol>

    Let's write and run a simple Kal program.

    <Code
        lang="kal"
        caption="hello.kal"
        code={["stdout \"Hello World!\\n\""]}
        output={"Hello World"}
    />

    Navigate to the directory where the source file exists and pass it to the Kal interpreter.

    <Code
        lang="bash"
        code={["$ kal hello.kal"]}
    />
</Content>