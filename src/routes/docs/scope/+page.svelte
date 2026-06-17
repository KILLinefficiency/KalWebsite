<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Card from "$lib/components/Card.svelte";
    import Fence from "$lib/components/Fence.svelte";
</script>

<Content title="Scopes & Shadowing" desc="Things are often short lived..." previous="/docs/fn" next="/docs/preproc">
    Scope of a variable determines where a variable exists and its lifetime indicates how long it lives. A variable declared at the top level generally lives till the end of the program.

    <Code
        caption="scope.kal"
        code={[
            "var name = \"Kal\". ;; top-level scope, lives forever"
        ]}
    />

    Symbols <Fence>{"{"}</Fence> and <Fence>{"}"}</Fence> start a scope.
    Anything declared within a scope is tied to it and hence lives as long as the scope lives.
    Inner scopes can access and modify all valid variables from the outer scope.

    <Code
        caption="scope.kal"
        code={[
            ";; outer scope",
            "var name = \"Kal\".\n",
            "if 1 + 1 == 2 {",
            "    ;; new scope",
            "    var pi = 3.14.\n",
            "    stdout pi \"\\n\". ;; accessible here",
            "    stdout name \"\\n\" ;; accessible here",
            "}\n",
            "stdout name \"\\n\". ;; accessible here",
            "stdout pi \"\\n\". ;; inaccessible here / error"
        ]}
    />

    Once the scope ends, the Garbage Collector will clean up all the variables local to that scope.
    
    <br /><br />
    <Fence>if</Fence>, <Fence>elif</Fence>, <Fence>else</Fence>, <Fence>loop</Fence> and function (<Fence>fn</Fence>) bodies all are scoped.

    <br /><br />
    If you intend for some data to be short lived, you can place it in an empty scope.
    Empty scopes allow you to set up custom scopes without needing context of <Fence>if</Fence>, <Fence>loop</Fence> and other bodies.

    <Code
        caption="emptyScope.kal"
        code={[
            "var name = \"Kal\".\n",
            "{",
            "    ;; empty scope",
            "    var pi = 3.14.",
            "    stdout pi \"\\n\".",
            "}\n",
            ";; inaccessible here / err",
            "stdout pi \"\\n\"."
        ]}
    />

    In certain scenarios, you may want to declare a variable inside a scope, but not keep it tied to its lifetime.
    Static variables are allowed to live freely outside their tied scope and are cleaned up by the garbage collector once the program ends.

    <Code
        caption="staticVariables.kal"
        code={[
            "fn testStatic -> {",
            "    var x = 10. ;; tied to testStatic",
            "    static y = 10. ;; exists freely\n",
            "    x = x + 5.",
            "    y = y + 5.\n",
            "    stdout \"X: \" x \" Y: \" y \"\\n\".",
            "}\n",
            ";; call testStatic five times",
            ":testStatic.",
            ":testStatic.",
            ":testStatic.",
            ":testStatic.",
            ":testStatic.\n",
            ";; accessible even outside testStatic",
            "stdout \"\\nY = \" y \"\\n\"."
        ]}
        output={"X: 15 Y: 15\nX: 15 Y: 20\nX: 15 Y: 25\nX: 15 Y: 30\nX: 15 Y: 35\n\nY = 35"}
    />

    Let's understand what happened here:

    Variable <Fence>x</Fence> is defined and is local to the <Fence>testStatic</Fence> function. Variable <Fence>y</Fence> is defined in the same function but its lifetime is not tied to <Fence>testStatic</Fence>'s scope.
    When <Fence>testStatic</Fence> is called once, <Fence>x</Fence> is created, assigned 10, incremented by 5 resulting in 15 and displayed. The function ends and so does <Fence>x</Fence>.
    <Fence>y</Fence> on the other hand is not garbage collected since it's free from the function's scope.

    On the next function invocation, <Fence>x</Fence> is created and destroyed with 15 being the final value.
    However, <Fence>y</Fence> is incremented by its previous value resulting in 20.
    This happens for the rest of the invocation leaving <Fence>y</Fence> with 35 as the final value.
    Since <Fence>y</Fence> is a static variable, it can be accessed outside the function body.

    <br /><br /><br />
    But what happens when you re-declare a variable in an inner scope that's already declared in the outer scope?
    This is where Variable Shadowing comes into action.

    <br /><br />
    Two variables can have the same names as long as they are in different scopes, whether it be an entire separate scope or a nested inner scope.

    <br /><br />
    While in the inner scope the variable assumes its latest assigned value. Once the scope ends, it reverts to its original value.

    <Code
        caption="shadow.kal"
        code={[
            ";; original value",
            "var name = \"Earth\".\n",
            "if 1 + 1 == 2 {",
            "    ;; `name` shadowed",
            "    var name = \"World\".",
            "    ;; shadowed value used",
            "    stdout \"Hello \" name \"!\\n\".",
            "}\n",
            ";; original value used",
            "stdout \"Hello \" name \"!\\n\"."
        ]}
        output={"Hello World!\nHello Earth!"}
    />


</Content>