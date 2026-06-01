<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Card from "$lib/components/Card.svelte";
    import Fence from "$lib/components/Fence.svelte";
</script>

<Content title="Functions" desc="Building abstractions!" next="/docs" previous="/docs">
    A function is a customizable and reusable block of code that can be invoked where ever needed. Functions change the control flow of the program and are used to create layers of abstraction to avoid duplicating code.

    <br /><br />
    You can create a function using the <Fence>fn</Fence> keyword.

    <Code
        lang="kal"
        caption="func.kal"
        code={[
            "fn greet {",
            "    stdout \"Hello Kal!\\n\".",
            "}"
        ]}
    />

    This example creates a function named <Fence>greet</Fence> that encapsulates the code block inside <Fence>{"{ }"}</Fence>.

    <br /><br />
    To invoke the created function, use the <Fence>:</Fence> symbol.

    <Code
        lang="kal"
        caption="func.kal"
        code={[
            ":greet."
        ]}
    />

    Complete picture:

    <Code
        lang="kal"
        caption="func.kal"
        code={[
            "fn greet {",
            "    stdout \"Hello Kal!\\n\".",
            "}\n",
            ":greet."
        ]}
        output={"Hello Kal!"}
    />

    Functions can be invoked before their declaration. Consider invoking <Fence>greet</Fence> before it is defined.

    <Code
        lang="kal"
        caption="func.kal"
        code={[
            ":greet.\n",
            "fn greet {",
            "    stdout \"Hello Kal!\\n\".",
            "}"
        ]}
        output={"Hello Kal!"}
    />

    Return data from a function using the <Fence>{"<-"}</Fence> operator. A function halts its execution at the point of return.
    Target operator (<Fence>{"->"}</Fence>) can be used during the function invocation to write the return value to a variable.

    <Code
        lang="kal"
        caption="return.kal"
        code={[
            "fn value {",
            "    <- 125 * 4.",
            "}\n",
            ":value -> x.\n",
            "stdout x \"\\n\"."
        ]}
        output={"100"}
    />

    Alternatively, you can convert function invocation into an expression using <Fence>$(...)</Fence> if you wish to perform additional operations on the return value of a function.

    <Code
        lang="kal"
        caption="returnExpr.kal"
        code={[
            "fn value {",
            "    <- 125 * 4.",
            "}\n",
            "var x = $(:value).",
            "stdout x \"\\n\".\n",
            "var y = $(:value) * 2.",
            "stdout y \"\\n\"."
        ]}
        output={"500\n1000"}
    />

    The behavior of a function can be customized by passing arguments to a function. A function declaration optionally takes a list of parameters that can be used in the function body.

    <Code
        lang="kal"
        caption="fnArgs.kal"
        code={[
            "fn add -> x, y {",
            "    <- x + y.",
            "}\n",
            ":add 45 55 -> sum.",
            "stdout \"Sum = \" sum \"\\n\"."
        ]}
        output={"Sum = 100"}
    />

    In this case, 45 and 55 are arguments which are assigned to function parameters <Fence>x</Fence> and <Fence>y</Fence>.

    <br />
    <Card>
        Variables in the parameter list are separated by commas (<Fence>,</Fence>).
    </Card>
    <br />

    Argument accepting functions can also be invoked as an expression.

    <Code
        lang="kal"
        caption="fnArgsExpr.kal"
        code={[
            "fn add -> x, y {",
            "    <- x + y.",
            "}\n",
            "var sum = $(:add 45 55).",
            "stdout \"Sum = \" sum \"\\n\"."
        ]}
        output={"Sum = 100"}
    />


</Content>