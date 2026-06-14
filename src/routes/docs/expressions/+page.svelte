<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Fence from "$lib/components/Fence.svelte";
    import Table from "$lib/components/Table.svelte";
</script>

<Content title="Expressions" desc="Evaluate to a single value..." next="/docs" previous="/docs">
    Expressions are composed of operators and operands and evaluate to a single final value.
    Kal supports all arithmetic, logical, relational, bitwise and unary operators.

    <br /><br />
    Here's a table highlighting all operators and their precedence (from highest to lowest):

    <br /><br />
    <Table
        header={["Operator", "Precedence"]}
        rows={[
            ["as", 16],
            ["??", 15],
            ["- ! ~", 14],
            ["**", 13],
            ["* / %", 12],
            ["+ -", 11],
            ["<< >>", 10],
            ["< <= > >=", 9],
            ["== !=", 8],
            ["&", 7],
            ["^", 6],
            ["|", 5],
            ["&&", 4],
            ["||", 3],
            ["? :", 2],
            [":=", 1]
        ]}
    />

    <br /><br />
    Let's look at these operators grouped by their types.

    Starting with arithmetic operators:
    <Code
        lang="kal"
        caption="arithmetic.kal"
        code={[
            "stdout",
            "    (8 + 5) \" \"    ;; addition",
            "    (8 - 5) \" \"    ;; subtraction",
            "    (8 * 5) \" \"    ;; multiplication",
            "    (8 / 5) \" \"    ;; division",
            "    (8 % 5) \" \"    ;; modulus",
            "    (8 ** 5) \"\\n\". ;; power"
        ]}
        output={"13 3 40 1.6 3 32768"}
    />

    Relational operators evaluate to 0 or 1, analogous to False and True based on the expressed relation.

    <Code
        lang="kal"
        caption="relational.kal"
        code={[
            "stdout",
            "    (5 == 5) \" \"     ;; equal to",
            "    (5 != 13) \" \"    ;; not equal to",
            "    (5 < 13) \" \"     ;; less than",
            "    (5 > 13) \" \"     ;; greater than",
            "    (5 >= 5) \" \"     ;; greater than or equal to",
            "    (13 <= 13) \"\\n\". ;; less than or equal to"
        ]}
        output={"1 1 1 0 1 1"}
    />

    Logical operators evaluate to 0 or 1, analogous to False and True based on the result of the boolean operation.
    
    <Code
        lang="kal"
        caption="logical.kal"
        code={[
            "stdout",
            "    (!0) \" \"   ;; logical not",
            "    (!1) \" \"",
            "    (0 || 0) \" \" ;; logical or",
            "    (0 || 1) \" \"",
            "    (1 || 1) \" \"",
            "    (0 && 0) \" \" ;; logical and",
            "    (0 && 1) \" \"",
            "    (1 && 1) \"\\n\"."
        ]}
        output={"1 0 0 1 1 0 0 1"}
    />

    Bitwise operators:

    <Code
        lang="kal"
        caption="bitwise.kal"
        code={[
            "stdout",
            "    (~5) \" \"        ;; bitwise not",
            "    (5 & 13) \" \"    ;; bitwise and",
            "    (5 | 13) \" \"    ;; bitwise or",
            "    (13 << 2) \" \"   ;; left shift",
            "    (13 >> 2) \"\\n\". ;; right shift"
        ]}
        output={"-6 13 13 52 3"}
    />

    The <Fence>as</Fence> operator is used to type cast values as you have already seen.

    <br /><br />
    The null coalescing operator, <Fence>??</Fence> is useful when you are not sure if the given variable is <Fence>null</Fence> or not. It takes a fallback value which is used if the varriable turns out to be <Fence>null</Fence>.

    <Code
        lang="kal"
        caption="nullCoalescing.kal"
        code={[
            "var value = null.",
            "stdout (value ?? \"Absent\") \"\\n\"."
        ]}
        output={"Absent"}
    />

    Here, the variable <Fence>value</Fence>, therefore <Fence>??</Fence> uses <Fence>"Absent"</Fence> as the fallback value.
    Null coalescing does not work if a variable that it's acting upon is not set to <Fence>null</Fence>.

    <Code
        lang="kal"
        caption="nullCoalescing.kal"
        code={[
            "var value = \"Present\".",
            "stdout (value ?? \"Absent\") \"\\n\"."
        ]}
        output={"Present"}
    />

    Ternary operators perform conditional operations based on the boolean expression that they act upon.
    They take two expressions, first of which is evaluated when the condition results in True and the other when the condition results in False.

    <Code
        lang="kal"
        caption="ternary.kal"
        code={[
            "var value = (1 == 1) ? \"Yes\" : \"No\".",
            "stdout value \"\\n\"."
        ]}
        output={"Yes"}
    />

    In this example the condition <Fence>(1 == 1)</Fence> results in True, therefore the expression associated with <Fence>?</Fence> is evaluated. The expression associated with <Fence>:</Fence> is discarded.

    <br /><br />
    Similarly, the expression associated with : is evaluated when the condition results in False.

    <Code
        lang="kal"
        caption="ternary.kal"
        code={[
            "var value = (1 == 2) ? \"Yes\" : \"No\".",
            "stdout value \"\\n\"."
        ]}
        output={"No"}
    />

    The ternary operators can be expanded multi-line for readability.
    <Code
        lang="kal"
        caption="expandedTernary.kal"
        code={[
            "var value = (1 == 2)",
            "    ? \"Yes\"",
            "    : \"No\".\n",
            "stdout value \"\\n\"."
        ]}
        output={"No"}
    />

    You can optionally use <Fence>?</Fence> and <Fence>:</Fence> operators individually.

    <Code
        lang="kal"
        caption="partialTernary.kal"
        code={[
            "var value = (1 == 1) ? \"Yes\".",
            "stdout value \"\\n\"."
        ]}
    />

    If the condition was evaluated to False, a fallback value 0 would have been returned.

    <Code
        lang="kal"
        caption="partialTernary.kal"
        code={[
            "var value = (1 == 2) : \"No\".",
            "stdout value \"\\n\"."
        ]}
        output={"No"}
    />

    If the condition was evaluated to True, a fallback value 1 would have been returned.

    <br /><br />
    The Walrus operator, <Fence>:=</Fence> allows you to initialize a variable inside an expression.

    <Code
        lang="kal"
        caption="walrus.kal"
        code={[
            "var value = (a := 10) * 2.",
            "stdout \"a = \" a \"\\n\".",
            "stdout \"value = \" value \"\\n\"."
        ]}
        output={"a = 10\nvalue = 20"}
    />

    The expression <Fence>(a := 10)</Fence> itself results in 10, the right hand value of the walrus operator once the variable is initialized.

    <br /><br />
    Multiple variables can be initialized in this way.

    <Code
        lang="kal"
        caption="multipleWalrus.kal"
        code={[
            "var value = (a := 10) * (b := 20).",
            "stdout \"a = \" a \"\\n\".",
            "stdout \"b = \" b \"\\n\".",
            "stdout \"value = \" value \"\\n\"."
        ]}
        output={"a = 10\nb = 20\nvalue = 200"}
    />

    You can have complex expressions as well as nesting with the walrus operator.

    <Code
        lang="kal"
        caption="complexWalrus.kal"
        code={[
            "var value =",
            "    (a := (7 + (x := 3)))",
            "    *",
            "    (b := (5 * 4)).\n",
            "stdout \"a = \" a \"\\n\"",
            "    \"b = \" b \"\\n\"",
            "    \"x = \" x \"\\n\"",
            "    \"value = \" value \"\\n\"."
        ]}
        output={"a = 10\nb = 20\nx = 3\nvalue = 200"}
    />

</Content>