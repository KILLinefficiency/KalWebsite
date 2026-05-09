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

</Content>