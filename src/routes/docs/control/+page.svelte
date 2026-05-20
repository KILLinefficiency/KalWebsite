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

    Conditionally executing your code is not everything. You also need to execute code multiple times. That's where <Fence>loop</Fence> comes in.
    A loop executes a block of code repeatedly based on the boolean condition provided to it. The conditions can be provided to it in many ways.

    Take for example:

    <Code
        caption="loop.kal"
        code={[
            "var count = 0.\n",
            "loop count < 5 {",
            "    stdout \"Hello\\n\".",
            "    count = count + 1.",
            "}"
        ]}
        output={"Hello\nHello\nHello\nHello\nHello"}
    />

    Analogous to the while loop, if loop takes in only one segment (boolean condition), that means the loop keeps on repeating till the condition evaluates to false.

    <br /><br />
    You can also use other control flow constructs in <Fence>loop</Fence>. Take <Fence>if</Fence> for example:

    <Code
        caption="loop.kal"
        code={[
            "var count = 1.\n",
            "loop count <= 5 {",
            "    if count % 2 == 0 {",
            "        stdout \"Hello x\" count \"\\n\".",
            "    }",
            "    count = count + 1.",
            "}"
        ]}
        output={"Hello x2\nHello x4"}
    
    />

    A much compact loop can be written with the declaration, condition and increment in a single line, much analogous to a <Fence>for</Fence> loop.

    <Code
        caption="loop.kal"
        code={[
            "loop count = 1 -- count < 5 -- count = count + 1 {",
            "    stdout \"Hello\\n\".",
            "}"
        ]}
        output={"Hello\nHello\nHello\nHello\nHello"}
    />

    Notice that the segments are separated by <Fence>--</Fence>.

    <br /><br />
    You can write each segment on a new line for better readability.

    <Code
        caption="loop.kal"
        code={[
            "loop count = 1 --",
            "     count < 5 --",
            "     count = count + 1 {",
            "     stdout \"Hello\\n\".",
            "}"
        ]}
        output={"Hello\nHello\nHello\nHello\nHello"}
    />

    Not all segments are mandatory in <Fence>loop</Fence>.
    You can skip them if you have provisioned them somewhere around or inside the loop block.

    <br /><br />
    Take these for examples:

    <Code
        caption="loop101.kal",
        code={[
            ";; skipping condition segment\n",
            "loop count = 1 -- -- count = count + 1 {",
            "    if count == 6 {",
            "        break.",
            "    }\n",
            "    stdout \"Count: \" count \"\\n\".",
            "}"
        ]}
        output={"Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5"}
    />

    <Code
        caption="loop110.kal"
        code={[
            ";; skipping increment segment\n",
            "loop count = 1 -- count <= 5 {",
            "    stdout \"Count: \" count \"\\n\".",
            "    count = count + 1.",
            "}"
        ]}
        output={"Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5"}
    />

    <Code
        caption="loop100.kal",
        code={[
            ";; skipping condition and increment segment\n",
            "loop count = 1 -- -- {",
            "    if count == 6 {",
            "        break.",
            "    }\n",
            "    stdout \"Count: \" count \"\\n\".",
            "    count = count + 1.",
            "}"
        ]}
        output={"Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5"}
    />

    <Code
        caption="loop001.kal"
        code={[
            ";; skipping assignment and condition segment\n",
            "var count = 1.\n",
            "loop -- -- count = count + 1 {",
            "    if count == 6 {",
            "        break.",
            "    }\n",
            "    stdout \"Count: \" count \"\\n\".",
            "}"
        ]}
        output={"Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5"}
    />

    Notice how some of the examples use <Fence>break</Fence>.
    It's also not mandatory that you run a loop the number of times it's designed to run. You can break out of a loop before it finishes all its iterations.

    <br /><br />
    Consider this program which breaks out of the loop once it hits an even number in the list it's iterating on.

    <Code
        caption="break.kal"
        code={[
            "var data = [1, 3, 5, 8, 10],",
            "    itr = 0.\n",
            "loop itr < $(len data) {",
            "    if data[itr] % 2 == 0 {",
            "        break.",
            "    }",
            "    stdout data[itr] \"\\n\".",
            "    itr = itr + 1.",
            "}"
        ]}
        output={"1\n3\n5"}
    />

    Breaking out of a loop is a hard stop. You may want to skip loop iterations sometimes. <Fence>continue</Fence> does that for you.

    <Code
        caption="continue.kal"
        code={[
            "loop count = 1 -- count <= 10 -- count = count + 1 {",
            "    if count == 4 || count == 9 {",
            "        continue.",
            "    }\n",
            "    stdout count \" \".",
            "}\n",
            "stdout \"\\n\"."
        ]}
        output={"1 2 3 5 6 7 8 10"}
    />

    Notice that only 4th and 9th iterations are skipped while the loop body executes as expected for other iterations.

    <br /><br />
    One of the most useful constructs of programming is a nested loop.
    A nested loop is a loop body that executes inside another loop body. Loops can be nested to any number of levels.

    <Code
        caption="nestedPairs.kal"
        code={[
            "loop i = 1 -- i <= 5 -- i = i + 1 {",
            "    loop j = 1 -- j <= 5 -- j = j + 1 {",
            "        if i == j {",
            "            continue.",
            "        }",
            "        stdout \"(\" i \", \" j \")\\n\".",
            "    }",
            "}"
        ]}
        output={"(1, 2)\n(1, 3)\n(1, 4)\n(1, 5)\n(2, 1)\n(2, 3)\n(2, 4)\n(2, 5)\n(3, 1)\n(3, 2)\n(3, 4)\n(3, 5)\n(4, 1)\n(4, 2)\n(4, 3)\n(4, 5)\n(5, 1)\n(5, 2)\n(5, 3)\n(5, 4)"}
    />

    Perhaps a very well known sorting algorithm that uses nested loops may help...
    <Code
        caption="bubbleSort.kal"
        code={[
            "var data = [3, 1, 5, 4, 2].\n",
            "stdout \"Before: \" data \"\\n\".\n",
            "var i = 0.",
            "loop i < $(len data) {",
            "    var j = i.",
            "    loop j < $(len data) {",
            "        if data[i] > data[j] {",
            "            ;; swap values",
            "            var [data[i], data[j]] = [data[j], data[i]].",
            "        }",
            "        j = j + 1.",
            "    }",
            "    i = i + 1.",
            "}\n",
            "stdout \"After:  \" data \"\\n\"."
        ]}
        output={"Before: [3, 1, 5, 4, 2]\nAfter:  [1, 2, 3, 4, 5]"}
    />

</Content>