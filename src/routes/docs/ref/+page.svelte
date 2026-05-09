<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Card from "$lib/components/Card.svelte";
    import Fence from "$lib/components/Fence.svelte";
</script>

<Content title="References" desc="They simply point to things..." next="/docs" previous="/docs">
    A reference is a managed pointer to an existing variable. It acts as an alias. A reference is a variable in itself but does not carry its own value. It can read from as well as write to the original variable.

    <br /><br />
    You can create a reference using the <Fence>&</Fence> symbol.

    <Code
        caption="ref.kal"
        code={[
            "var name = \"Kal\".",
            "var lang = &name. ;; ref to name"
        ]}
    />

    Here, <Fence>name</Fence> is the original variable which holds an actual value. <Fence>lang</Fence> on the other hand is a reference that refers/points to name. <Fence>lang</Fence> itself does not have its own value.
    
    <br /><br />
    Also note that, lang directly points to “Kal”, it does not copy the value. Since a reference is not a copy, it occupies very little space in the memory.

    <br /><br />
    You can have multiple references to an existing variable. Modifying the reference also modifies the original value.

    <Code
        caption="ref.kal"
        code={[
            "var count = 0.",
            "stdout \"Count = \" count \"\\n\".\n",
            "var countRef = &count.",
            "countRef = 10.\n",
            "stdout \"Count = \" count \"\\n\"."
        ]}
        output={"Count = 0\nCount = 10"}
    />

    You can have references to elements of lists and dictionaries as well.

    <Code
        caption="ref.kal"
        code={[
            "var data = [1, 2, 3].",
            "var item = &data[1].",
            "item = item * 10.",
            "stdout data \"\\n\"."
        ]}
    />

    <Card type="warn">
    You must be very careful when creating references as any unintended change to the reference will change the base variable.
    </Card>

    <br />
    When you pass a variable to a function, it treats it as a value and makes a copy. This is where references can be useful.
    <br /><br />
    You may not want to pass data as value for two main reasons:
    <ul>
        <li>Modify the data via the function.</li>
        <li>Avoid making extra copies.</li>
    </ul>

    Passing by reference addresses both of these reasons.

    <br /><br />
    Let's look at an example:

    <Code
        caption="passByRefBuggy.kal"
        code={[
            "fn change -> x {",
            "    x = x * 10.",
            "    stdout \"In Fn: \" x \"\\n\".",
            "}\n",
            "var data = 5.",
            "stdout \"Before: \" data \"\\n\".",
            ":change data.",
            "stdout \"After: \" data \"\\n\"."
        ]}
        output={"Before: 5\nIn Fn: 50\nAfter: 5"}
    />

    That's weird, right? <Fence>data</Fence> should have changed but it didn't. Well, here's what happened:
    <br />
    When <Fence>data</Fence> was passed to the function <Fence>change</Fence>, the function made a copy of it and assigned it to <Fence>x</Fence>, therefore <Fence>x</Fence> changed, but <Fence>data</Fence> never did.
    The change was visible only inside the function.

    <br /><br />
    To make this example code work, simply pass <Fence>data</Fence> to change by reference as <Fence>&data</Fence>.

    <Code
        caption="passByRef.kal"
        code={[
            "fn change -> x {",
            "    x = x * 10.",
            "    stdout \"In Fn: \" x \"\\n\".",
            "}\n",
            "var data = 5.",
            "stdout \"Before: \" data \"\\n\".",
            ":change &data. ;; passed by reference",
            "stdout \"After: \" data \"\\n\"."
        ]}
        output={"Before: 5\nIn Fn: 50\nAfter: 50"}
    />

    <Card type="info">
    References can be passed during the function invocation. They do not need to be declared in any way during function definition.
    </Card>

</Content>