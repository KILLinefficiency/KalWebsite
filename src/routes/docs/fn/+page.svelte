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

    A function that invokes itself is called a recursive function. A recursive function must always have a base condition that ends the function execution. An absent base condition may cause the function to execute infinitely. Consider the classic factorial example.

    <Code
        lang="kal"
        caption="factorial.kal"
        code={[
            "fn fact -> n {",
            "    ;; base condition",
            "    if n <= 1 {",
            "        <- 1.",
            "    }\n",
            "    ;; recursive func call",
            "    <- n * $(:fact (n - 1)).",
            "}\n",
            ":fact 5 -> val.\n",
            "stdout \"5! = \" val \"\\n\"."
        ]}
        output={"5! = 120"}
    />

    Functions parameters can have default values. That means, if a value is not passed to a parameter, the function assigns a default value to it.

    <br /><br />
    Assign default values to a parameter using the <Fence>:</Fence> operator after the parameter name.
    Let's revisit the greet function:

    <Code
        lang="kal"
        caption="greet.kal"
        code={[
            "fn greet -> name: \"Kal\" {",
            "    stdout \"Hello \" name \"!\\n\".",
            "}\n",
            ":greet.",
            ":greet \"Barry\"."
        ]}
        output={"Hello Kal!\nHello Barry!"}
    />

    Notice how during the first invocation of greet no argument was passed. Therefore, it picked up the default value. In the next invocation, an actual argument is passed, it thus overrides the default values of the parameter.

    <br /><br />
    Multiple arguments can have default values. It's not mandatory to override none or all arguments of a function. You can choose to override only the required parameters.

    <Code
        lang="kal"
        caption="defArgs.kal"
        code={[
            "fn add -> x: 10, y: 20 {",
            "    <- x + y.",
            "}\n",
            ";; all default",
            "stdout $(:add) \"\\n\".\n",
            ";; override x, default y",
            "stdout $(:add 20) \"\\n\".\n",
            ";; override both x and y",
            "stdout $(:add 45 55) \"\\n\"."
        ]}
        output={"30\n40\n100"}
    />


    So far, we have written functions that take a fixed number of arguments. Often, you may want to write functions that take an unknown number of arguments.
    A variadic function accepts a variadic parameter.

    <br /><br />
    A variadic parameter is a single parameter that encapsulates all the unknown amount of arguments into a single list. The function body can then utilize the arguments from the list as needed.

    <br /><br />
    Variadic parameter is created by prefixing it with <Fence>...</Fence>.
    Let's create a variadic function, <Fence>sum</Fence> which accepts any number of arguments and returns their sum.

    <Code
        lang="kal"
        caption="variadicSum.kal"
        code={[
            "fn sum -> ...nums {",
            "    ;; argument list",
            "    stdout \"Args: \" nums \"\\n\".",
            "    var total = 0.\n",
            "    loop each in nums {",
            "        total = total + each.",
            "    }\n",
            "    <- total.",
            "}\n",
            ":sum 1 2 3 -> total.",
            "stdout \"Total = \" total \"\\n\".\n",
            ":sum 1 2 3 4 5 -> total.",
            "stdout \"Total = \" total \"\\n\"."
        ]}
        output={"Args: [1, 2, 3]\nTotal = 6\nArgs: [1, 2, 3, 4, 5]\nTotal = 15"}
    />

</Content>