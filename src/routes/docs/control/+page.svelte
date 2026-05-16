<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Card from "$lib/components/Card.svelte";
    import Fence from "$lib/components/Fence.svelte";
    import Table from "$lib/components/Table.svelte";
</script>

<Content title="Control Flow", desc="Sometimes you gotta branch out..." next="/docs" previous="/docs">
    It's not necessary that all of your code needs to run sequentially. Sometimes, you need to run a piece of code conditionally.
    Control Flow statements allow you to achieve this. Let's start with the most basic control flow statement: <Fence>if</Fence>.

    <br /><br />
    The <Fence>if</Fence> block executes only if the given condition is true. The condition is a boolean expression.

    The <Fence>if</Fence> block starts with an opening brace (<Fence>{"{"}</Fence>) and ends with a closing brace (<Fence>{"}"}</Fence>).

    <Code
        caption="if.kal"
        code={[
            "var name = \"Kal\".\n",
            "if name == \"Kal\" {",
            "    stdout \"Yes\\n\".",
            "}"
        ]}
        output={"Yes"}
    />

    Meanwhile, <Fence>else</Fence> block is executed when the condition for the <Fence>if</Fence> block fails.

    <Code
        caption="ifElse.kal"
        code={[
            "if 2 + 2 == 5 {",
            "    stdout \"Yes\\n\".",
            "}\n",
            "else {",
            "    stdout \"No\\n\".",
            "}"
        ]}
        output="No"
    />

    <Fence>else</Fence> block is similar to if except it does not accept a boolean condition.
    It keeps track of the condition associated with the if block and executes <Fence>if</Fence> the condition evaluates to false.

    <br /><br />
    <Fence>else</Fence> blocks are not mandatory. You can have <Fence>if</Fence> blocks without else blocks.


    <br /><br />
    Now, here's an interesting addition, Kal allows you to split <Fence>if</Fence> and <Fence>else</Fence> blocks with other statements in between without any problems!

    <Code
        caption={"interstingIfElse.kal"}
        code={[
            "var name = \"Kal\".\n",
            ";; block for conditon A",
            "if 2 + 2 == 5 {",
            "    stdout \"Hello\\n\".",
            "}\n",
            ";; block for condition B",
            "if name == \"Kal\" {",
            "    stdout \"Hi\\n\".",
            "}\n",
            ";; block for condition B",
            "else {",
            "    stdout \"Hey\\n\".",
            "}\n",
            ";; block for condition A",
            "else {",
            "    stdout \"World\\n\".",
            "}"
        ]}
        output={"Hi\nWorld"}
    />

    Kal smartly keeps track of which <Fence>else</Fence> block is associated with what <Fence>if</Fence> block.

    <Fence>if</Fence> and <Fence>else</Fence> blocks can be nested together.

    <Code
        caption="nestedIf.kal"
        code={[
            "var name = \"Kal\".\n",
            "if name == \"Kal\" {",
            "    var sum = 2,",
            "        line = \"Awesome\".\n",
            "    if 1 + 1 == sum {",
            "        stdout line \"\\n\".",
            "    }",
            "}"
        ]}
        output={"Awesome"}
    />

    Sometimes you may need to declare and use a variable only for a specific context. Take this for an example:

    <Code
        caption="verifyAge.kal"
        code={[
            "var age = 22.\n",
            "if age > 18 {",
            "    stdout \"You are \" age \"...\\n\".",
            "    stdout \"You can drive!\\n\".",
            "}"
        ]}
        output={"You are 22...\nYou can drive!"}
    />

    In this case, the <Fence>age</Fence> variable was declared before the <Fence>if</Fence> block and used only within it.
    This can be compacted into more context aware boolean conditions using the Walrus operator.

    The Walrus Operator (<Fence>:=</Fence>) allows you to declare variables as part of an expression.

    <Code
        caption="walrus.kal"
        code={[
            "var y = (x := 10) * 2.",
            "stdout \"X: \" x \" Y: \" y \"\\n\"."
        ]}
        output={"X: 10 Y: 20"}
    />

    Here <Fence>x</Fence> is declared and set to 10 within the expression and the assigned value is utilized to evaluate for <Fence>y</Fence>.

    <br /><br />
    Using walrus operator, the previous <Fence>verifyAge.kal</Fence> program can be compacted to:

    <Code
        caption="verifyAge.kal"
        code={[
            "if (age := 22) > 18 {",
            "    stdout \"You are \" age \"...\\n\".",
            "    stdout \"You can drive!\\n\".",
            "}"
        ]}
        output={"You are 22...\nYou can drive!"}
    />

    In Boolean Algebra, operators <Fence>&&</Fence> and <Fence>||</Fence> exhibit an interesting property. Take a look at this table:

    <br /><br />
    <Table
        header={["X", "Y", "&&", "||"]}
        rows={[
            ["False", "False", "False", "False"],
            ["False", "True", "False", "True"],
            ["True", "False", "False", "True"],
            ["True", "True", "True", "True"]
        ]}
    />

    <br /><br />
    Here we can observe that in 50% of the cases:
    <ul>
        <li>For <Fence>&&</Fence>, the final result is false if the first operand is false.</li>
        <li>For <Fence>||</Fence>, the final result is true if the first operand is true.</li>
    </ul>

    In such a case, the second operand is not required to be evaluated. This is called Shortcircuiting.

    <br /><br />
    This may sound insignificant but boolean shortcircuiting can save a huge overhead if the second operand involves heavy computation.

    <br /><br />
    Consider the following example:

    <Code
        caption="shortAnd.kal"
        code={[
            "fn x -> {",
            "    <- 0.",
            "}\n",
            "fn y -> {",
            "    <- 1.",
            "}\n",
            "if $(:x) && $(:y) {",
            "    stdout \"Done\\n\".",
            "}"
        ]}
        output={"Invoked X"}
    />

    Function <Fence>x</Fence> is invoked since it's the first operand, and the stdout statement is executed.
    Since its return value is 0 and the expression evaluates && operation to 0, the invocation of function <Fence>y</Fence> is entirely skipped.

    <br /><br />
    Similar behavior can be seen with <Fence>||</Fence>.

    <Code
        caption="shortOr.kal",
        code={[
            "fn x -> {",
            "    stdout \"Invoked X\\n\".",
            "    <- 0.",
            "}\n",
            "fn y -> {",
            "    stdout \"Invoked Y\\n\".",
            "    <- 1.",
            "}\n",
            "if $(:y) || $(:x) {",
            "    stdout \"Done\\n\".",
            "}"
        ]}
        output={"Invoked Y\nDone"}
    />

    Here, invocations for function <Fence>x</Fence> and <Fence>y</Fence> have swapped places so that the function returning 1 is invoked first, making the entire expression to result in 1 instantly without invoking function <Fence>x</Fence>.

    <br /><br />
    You may need both of the functions to be invoked regardless, especially if the functions produce useful side effects. In that case, you can invoke the functions first and use their return values in an expression later.

    <Code
        caption="invokeAll.kal"
        code={[
            "fn x -> {",
            "    stdout \"Invoked X\\n\".",
            "    <- 0.",
            "}\n",
            "fn y -> {",
            "    stdout \"Invoked Y\\n\".",
            "    <- 1.",
            "}\n",
            ":y -> yVal.",
            ":x -> xVal.\n",
            "if yVal || xVal {",
            "    stdout \"Done\\n\".",
            "}"
        ]}
        output={"Invoked Y\nInvoked X\nDone"}
    />
</Content>