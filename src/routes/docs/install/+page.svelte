<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Table from "$lib/components/Table.svelte";
</script>

<Content title="Installing Kal" desc="From Github" next="/docs" previous="/docs/">
    <Code
        caption="Hello World"
        code={
            ['stdout "Hello World". ;; print hello']
        }
        output={"Hello World"}
    />

    <Code
        caption="Linux"
        code={
            ["$ kal main.kal"]
        }
        output={"Done"}
    />

    <Table header={["Hello", "World", "Hi"]} rows={[
        ["Clark", "Bruce", "Oliver"],
        ["Ben", "Kevin", "Gwen"],
        ["Peter", "Miles", "Miguel"],
        ["Phineas", "Ferb", "Candace"]
    ]} />
</Content>