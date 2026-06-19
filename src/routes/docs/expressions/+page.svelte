<script>
    import { base } from "$app/paths";

    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Fence from "$lib/components/Fence.svelte";
    import Table from "$lib/components/Table.svelte";
</script>

<Content title="Expressions" desc="Evaluate to a single value..." previous="{base}/docs/statements" next="{base}/docs/builtins">
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

    You may have noticed the excessive use of parentheses.
    They override the order of precedence and allow sub-expression to be evaluated prior.

    <Fence>*</Fence> operator has a higher order of precedence than the <Fence>+</Fence> operator.

    <Code
        lang="kal"
        caption="precedence.kal"
        code={[
            "var value = 1 + 2 * 3.",
            "stdout \"value = \" value \"\\n\"."
        ]}
        output={"value = 7"}
    />

    Here, sub-expression <Fence>2 * 3</Fence> is evaluated first and the result is added to 1 giving 7 as the final value.

    <br /><br />
    The sub-expression <Fence>1 + 2</Fence> can be made to evaluate first by wrapping it with parentheses.

    <Code
        lang="kal"
        caption="parenPrecedence.kal"
        code={[
            "var value = (1 + 2) * 3.",
            "stdout \"value = \" value \"\\n\"."
        ]}
        output={"value = 9"}
    />

    Now, <Fence>(1 + 2)</Fence> is evaluated first and the result is multiplied with 3 giving 9 as the final value.

    <br /><br />
    Parentheses are also strictly required when you are passing expressions as arguments to statements.

    <Code
        lang="kal"
        caption="exprArg.kal"
        code={[
            "stdout 5 + 8 \"\\n\". ;; error"
        ]}
    />

    Wrap the expression with parentheses.

    <Code
        lang="kal"
        caption="exprArg.kal"
        code={[
            "stdout (5 + 8) \"\\n\"."
        ]}
        output={"13"}
    />

    Values returned by statements are directly assigned to variables.
    These values can't be used in an expression directly on an immediate basis.
    Kal allows you to convert a statement into an expression so that other operators and operands can use the return value immediately.

    <br /><br />
    Let's consider two statements <Fence>first</Fence> and <Fence>last</Fence>, which return the first and last elements of a list respectively.

    <Code
        lang="kal"
        caption="statement.kal"
        code={[
            "var data = [30, 45, 60].\n",
            "first data -> f.",
            "last data -> l.\n",
            "stdout \"First = \" f \"\\n\"",
            "    \"Last = \" l \"\\n\"."
        ]}
        output={"First = 30\nLast = 60"}
    />

    Observe how return values or <Fence>first</Fence> and <Fence>last</Fence> can be used only after their values are assigned to <Fence>f</Fence> and <Fence>l</Fence>.

    <br /><br />
    This example can be compacted by converting those statements into expressions by wrapping it with <Fence>$(</Fence> and <Fence>)</Fence>. These expressions result in the final return value and hence don't require the target operator (<Fence>{"->"}</Fence>).
    
    <Code
        lang="kal"
        caption="statementExpr.kal"
        code={[
            "var data = [30, 45, 60].\n",
            "stdout",
            "    \"First = \" $(first data) \"\\n\"",
            "    \"Last = \" $(last data) \"\\n\".",
        ]}
        output={"First = 30\nLast = 60"}
    />

    These expressions can used as a part of a larger expression.

    <Code
        lang="kal"
        caption="statementExprComplex.kal"
        code={[
            "var data = [30, 45, 60].\n",
            "var sum = $(first data) + $(last data).\n",
            "stdout \"Sum = \" sum \"\\n\"."
        ]}
        output={"Sum = 90"}
    />
</Content>