<script>
    import { base } from "$app/paths";

    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Fence from "$lib/components/Fence.svelte";
    import Card from "$lib/components/Card.svelte";
    import Table from "$lib/components/Table.svelte";
</script>

<Content title="Statements" desc="And so we begin..." previous="{base}/docs/install" next="{base}/docs/expressions">
    A statement is a basic unit of execution in Kal. It performs an operation. You have seen <Fence>stdout</Fence> in the previous chapter. It simply prints information to the screen.
    Any information passed to a statement is its argument. A statement can have multiple arguments.

    <br /><br />
    Take <Fence>stdout</Fence> for example.

    <Code
        lang="kal"
        caption="hello.kal"
        code={["stdout \"Hello\" \" Kal! \" \"\\n\"."]}
        output={"Hello Kal!"}
    />

    As you may have noticed, all Kal statements, except for preprocessor statements, beginning and ending of blocks end with a period (<Fence>.</Fence>).

    <br /><br />
    You can also split statements across multiple lines as long as they end with a period.
    <Code
        lang="kal"
        caption="hello.kal"
        code={["stdout \"Hello\"\n    \"Kal!\"\n    \"\\n\"."]}
        output={"Hello Kal!"}
    />

    You don't always need to create and pass values immediately. You may want to store them beforehand, process them and use them later.
    You can store values inside variables. Use <Fence>var</Fence> statements to create variables.

    <Code
        lang="kal"
        caption="variables.kal"
        code={["var planet = \"Earth\"."]}
    />

    Variables can directly be used wherever needed.

    <Code
        lang="kal"
        caption="variables.kal"
        code={[
            "var planet = \"Earth\".",
            "stdout \"From \" plant \"\\n\"."
        ]}
        output={"From Earth"}
    />

    You can have as many <Fence>var</Fence> statements as needed.
    When declaring a large number of variables together, the <Fence>var</Fence> statement can be extended using commas (<Fence>,</Fence>).

    <Code
        lang="kal"
        caption="variables.kal"
        code={[
            "var name = \"Kal\", planet = \"Earth\".",
            "stdout name \" is from \" planet \"\\n\"."
        ]}
        output={"Kal is from Earth"}
    />

    Variables are called “variables” for a reason. Their values can be changed.
    You can reassign a value to a variable directly without using the <Fence>var</Fence> statement again.

    <Code
        lang="kal"
        caption="reassignVar.kal"
        code={[
            "var g = 10.",
            "stdout \"g = \" g \"\\n\".\n",
            ";; Variable reassignment",
            "g = 9.8.",
            "stdout \"g = \" g \"\\n\"."
        ]}
        output={"g = 10\ng=9.8"}
    />

    Kal is dynamically typed. A variable can be reassigned to a value to different type.

    <Code
        lang="kal"
        caption="dynamicReassign.kal"
        code={[
            "var pi = \"pi\". ;; string",
            "pi = 3.14. ;; float"
        ]}
    />

    Wait, what were those semi-colons? Semi-colons in Kal are used to write comments. Comments are ignored by the Kal interpreter and are used to write instructions for the programmers.
    Another use case is to comment out code which you don't wish to execute.

    <br /><br />
    Kal supports both single-line and multi-line comments. Single-line comments start with <Fence>;;</Fence> and comment out everything till the end of the line.
    On the other hand, multi-line comments start and end with <Fence>;</Fence> and can be used to comment as many lines as needed.

    <Code
        lang="kal"
        caption="comments.kal"
        code={[
            ";; single line comment\n",
            ";\n    multi\n    line\n    comment\n;\n",
            "stdout \"Not a comment\"."
        ]}
        output={"Not a comment"}
    />

    Kal offers 5 data types: Numbers, Strings, Lists, Dictionaries and Nulls.

    <br /><br />
    Numbers support integers and floats together.

    <Code
        lang="kal"
        caption="numbers.kal"
        code={[
            "var pi = 3.14.",
            "var value = 123."
        ]}
    />

    Strings represent textual data. They start and end with a double quote symbol (<Fence>"</Fence>).

    <Code
        lang="kal"
        caption="strings.kal"
        code={[
            "var planet = \"Earth\"."
        ]}
    />

    Have you noticed that <Fence>\n</Fence> character before? That's an escape character. An escape character has a special meaning.
    In this case, <Fence>\n</Fence> represents a new line. Every escape character starts with a backslash, <Fence>\</Fence>.

    <br /><br />
    Kal supports the following escape characters.

    <br /><br />
    <Table
        header={["Name", "Character"]}
        rows={[
            ["New Line", "\\n"],
            ["Tab", "\\t"],
            ["Backspace", "\\b"],
            ["Backslash", "\\\\"],
            ["Double Quote", "\\\""],
            ["Carriage Return", "\\r"]
        ]}
    />

    <br /><br />
    Lists are collections of multiple values in a single container.
    Lists start and end with <Fence>[</Fence> and <Fence>]</Fence> respectively with values separated by a comma (<Fence>,</Fence>).

    <Code
        lang="kal"
        caption="lists.kal"
        code={[
            "var celestialBodies = [\"Sun\", \"Earth\", \"Moon\"]."
        ]}
    />

    If a list grows large, it can be split into multiple lines.

    <Code
        lang="kal"
        caption="lists.kal"
        code={[
            "var celestialBodies = [",
            "    \"Sun\",",
            "    \"Earth\",",
            "    \"Moon\"",
            "]."
        ]}
    />

    Lists in Kal are heterogenous. This means, you can have values of different types inside the same list.

    <Code
        lang="kal"
        caption="heterogenousList.kal"
        code={[
            "var data = [\"Pi\", 3.14]."
        ]}
    />

    As the complexity of your data grows, you can nest one list into another.

    <Code
        lang="kal"
        caption="nestedList.kal"
        code={[
            ";; a 3x3 matrix",
            "var matrix = [",
            "    [1, 2, 3],",
            "    [4, 5, 6],",
            "    [7, 8, 9]",
            "]."
        ]}
    />

    You can use <Fence>[]</Fence> symbols to access values from the list via an index.
    Index is the position of the item in the list. Indexes start from 0 in Kal.

    <Code
        lang="kal"
        caption="listAccess.kal"
        code={[
            "var data = [1, 2, 3].",
            "stdout \"Value = \" data[1] \"\\n\"."
        ]}
        output={"2"}
    />

    Elements inside the list can also be reassigned in a similar fashion.

    <Code
        lang="kal"
        caption="listElementReassign.kal"
        code={[
            "var data = [1, 2, 3].",
            "stdout \"Before = \" data \"\\n\".\n",
            "data[1] = 20.",
            "stdout \"After = \" data \"\\n\"."
        ]}
        output={"Before = [1, 2, 3]\nAfter = [1, 20, 3]"}
    />

    A negative index can be used to access a list from the end. Negative indexes start with -1.

    <Code
        lang="kal"
        caption="negativeIndex.kal"
        code={[
            "var data = [1, 2, 3].",
            "stdout \"Last = \" data[-1] \"\\n\".\n",
            "data[-1] = 4.",
            "stdout \"Final = \" data \"\\n\"."
        ]}
        output={"Last = 3\nFinal = [1, 2, 4]"}
    />

    Symbols <Fence>[]</Fence> can be chained together to get/reassign elements from/to a nested list.
    
    <Code
        lang="kal"
        caption="nestedListReassign.kal"
        code={[
            ";; 2x2 matrix",
            "var matrix = [",
            "    [4, 5],",
            "    [6, 7]",
            "].\n",
            "stdout \"--- Before ---\\n\".",
            "stdout \"Matrix = \" matrix \"\\n\".",
            "stdout \"Diagonal = \" matrix[0][0] \", \" matrix[1][1] \"\\n\".\n",
            "stdout \"--- After ---\\n\".",
            "matrix[0][0] = 10.",
            "matrix[1][1] = 20.\n",
            "stdout \"Matrix = \" matrix \"\\n\".",
            "stdout \"Diagonal = \" matrix[0][0] \", \" matrix[1][1] \"\\n\".",
        ]}
        output={"--- Before ---\nMatrix = [[4, 5], [6, 7]]\nDiagonal = 4, 7\n--- After ---\nMatrix = [[10, 5], [6, 20]]\nDiagonal = 10, 20"}
    />

    Similarly, Dictionaries are also heterogenous collections of elements in a key-value pair. A Dictionary starts with <Fence>#(</Fence> and ends with <Fence>)</Fence>.

    <Code
        lang="kal"
        caption="dict.kal"
        code={[
            "var data = #(",
            "    planet -> \"Earth\",",
            "    species -> \"Humans\"",
            ")."
        ]}
    />

    Keys and values are separated by <Fence>{"->"}</Fence> whereas key-value pairs are separated by commas (<Fence>,</Fence>). Keys are stored as strings, whereas values can be of any type.
    If keys contain spaces, surround them with double quotation marks (<Fence>""</Fence>).

    <Code
        lang="kal"
        caption="dict.kal"
        code={[
            "var data = #(",
            "    planet -> \"Earth\",",
            "    species -> \"Humans\",",
            "    \"total hours\" -> 24",
            ")."
        ]}
    />

    Access symbols (<Fence>[]</Fence>) can be used to access a specific value using its key.

    <Code
        lang="kal"
        caption="dictAccess.kal"
        code={[
            "var data = #(",
            "    planet -> \"Earth\",",
            "    species -> \"Humans\",",
            ").\n",
            "stdout \"Species = \" data[\"species\"] \"\\n\"."
        ]}
        output={"Species = Humans"}
    />

    Similarly, values can be reassigned.

    <Code
        lang="kal"
        caption="reassignValues.kal"
        code={[
            "var data = #(",
            "    planet -> \"Earth\",",
            "    species -> \"Humans\",",
            ").\n",
            "stdout \"Before:\\n\".",
            "stdout data \"\\n\".\n",
            "stdout \"After:\\n\".",
            "data[\"species\"] = \"Trees\".",
            "stdout data \"\\n\"."
        ]}
        output={"Before:\n#(planet -> \"Earth\", species -> \"Humans\")\nAfter:\n#(planet -> \"Earth\", species -> \"Trees\")"}
    />

    You can add new key-value pairs in the same fashion.

    <Code
        lang="kal"
        caption="newPair.kal"
        code={[
            "var data = #(",
            "    planet -> \"Earth\",",
            "    species -> \"Humans\",",
            ").\n",
            "data[\"total hours\"] = 24.",
            "stdout data \"\\n\"."
        ]}
        output={"#(planet -> \"Earth\", species -> \"Humans\", total hours -> 24)"}
    />

    Dictionaries can be nested. <Fence>[]</Fence> symbols can be chained together to access or reassign values.

    <Code
        lang="kal"
        caption="nestedDict.kal"
        code={[
            "var data = #(",
            "    planet -> \"Earth\",",
            "    resources -> #(",
            "        trees -> \"Wood\",",
            "        ores -> \"Metals\",",
            "        oceans -> \"Water\"",
            "    )",
            ").\n",
            "stdout data[\"resources\"][\"oceans\"] \"\\n\".\n",
            "data[\"resources\"][\"oceans\"] = \"Salt\".\n",
            "stdout data[\"resources\"][\"oceans\"] \"\\n\"."
        ]}
        output={"Water\nSalt"}
    />

    Lists and Dictionaries can be nested within each other.

    <Code
        lang="kal"
        caption="nestedDictList.kal"
        code={[
            ";; dict",
            "var data = #(",
            "    planet -> \"Earth\",\n",
            "    ;; nested list",
            "    resources -> [\"Wood\", \"Metal\", \"Water\"],\n",
            "    ;; list",
            "    biomes -> [",
            "        ;; nested dict",
            "        #(",
            "            land -> [\"forest\", \"desert\"],",
            "        ),",
            "        #(",
            "            water -> [\"ocean\", \"river\"]",
            "        )",
            "    ]",
            ").\n",
            "stdout data[\"resources\"][2]",
            "    \" comes from the \"",
            "    data[\"biomes\"][1][\"water\"][0] \".\\n\"."
        ]}
        output={"Water comes from the ocean."}
    />

    Null represents absence of value. Variables set to <Fence>null</Fence> can be reassigned to actual values later.

    <Code
        lang="kal"
        caption="null.kal"
        code={[
            "var data = null.",
            "stdout \"Data = \" data \"\\n\".\n",
            "data = 100.",
            "stdout \"Data = \" data \"\\n\"."
        ]}
        output={"Data = null\nData = 100"}
    />

    Uninitialized variables are set to <Fence>null</Fence>.

    <Code
        lang="kal"
        caption="nullInitialize.kal"
        code={[
            "var data.",
            "stdout \"Data = \" data \"\\n\""
        ]}
        output={"Data = null"}
    />

    If you are unsure of the type of the variable you are dealing with, you can confirm it using the type statement.

    <br /><br />
    So far you have seen statements that perform operations. Oftentimes that is not enough. You’ll also be requiring the end result of a statement. Kal statements return values wherever appropriate.

    <br /><br/>
    <Fence>type</Fence> is one of those statements.

    <Code
        lang="kal"
        caption="type.kal"
        code={[
            "var name = \"Kal\".\n",
            "type name -> t.\n",
            "stdout \"Type = \" t \"\\n\"."
        ]}
        output={"Type = String"}
    />

    Observe the syntax of the <Fence>type</Fence> statement:
    <ul>
        <li><Fence>type</Fence> is the name of the statement.</li>
        <li><Fence>name</Fence> is the argument passed to it.</li>
        <li><Fence>{"->"}</Fence> is the target operator.</li>
        <li><Fence>t</Fence> is the variable that holds the return value.</li>
    </ul>

    The target operator assigns the return value to the provided variable. If the variable already exists, it's reassigned to hold the return value.
    If not, a new variable is declared and the return value is assigned.

    <br /><br />
    Alternatively, you can convert a statement into an expression by wrapping it into <Fence>$(</Fence> and <Fence>)</Fence>.
    Doing so removed the need to use a target operator. The return value also becomes part of a larger expression.

    <Code
        lang="kal"
        caption="typeExpr.kal"
        code={[
            "var name = \"Kal\".\n",
            "var t = $(type name).\n",
            "stdout \"Type = \" t \"\\n\"."
        ]}
        output={"Type = String"}
    />

    Conversion of types between numerical and string data is possible using the <Fence>as</Fence> operator.
    The <Fence>as</Fence> operator takes the value to be converted as the first operand and the type to be converted to as the second operand.

    <Code
        lang="kal"
        caption="strToInt.kal"
        code={[
            "var data = \"123\" as int.",
            "stdout $(type data) \"\\n\"."
        ]}
        output={"Number"}
    />

    <Code
        lang="kal"
        caption="intToStr.kal"
        code={[
            "var data = 456 as str.",
            "stdout $(type data) \"\\n\"."
        ]}
        output={"String"}
    />

    <Code
        lang="kal"
        caption="strToFloat.kal"
        code={[
            "var data = \"3.14\" as float.",
            "stdout $(type data) \"\\n\"."
        ]}
        output={"Number"}
    />

    Number is an umbrella term for both integers and floats.
    Conversion of a float to integer removes the fractional part.

    <Code
        lang="kal"
        caption="floatToInt.kal"
        code={[
            "var data = 3.14 as int.",
            "stdout data \"\\n\".",
            "stdout $(type data) \"\\n\"."
        ]}
        output={"3\nNumber"}
    />

    <br /><br />
    Complicated data involving string literals and variables can be easily composed together. Formatted strings start with f( and end with ). Values encompassed inside these symbols are separated by commas.

    <br /><br />
    The very first value is the template string which defines dynamic parts using <Fence>{"{}"}</Fence> as a place holder. Rest of the values are positionally placed inside the template string replacing their respective placeholders.

    <Code
        lang="kal"
        caption="fstr.kal"
        code={[
            "var string = f(\"Formatted {}!\", \"String\").",
            "stdout string \"\\n\"."
        ]}
        output={"Formatted String!"}
    />

    Variables can also be embedded dynamically.

    <Code
        lang="kal"
        caption="dynFstr.kal"
        code={[
            "var data = \"String\".",
            "var string = f(\"Formatted {}!\", data).",
            "stdout string \"\\n\"."
        ]}
        output={"Formatted String!"}
    />

    Expressions are evaluated and used as values.

    <Code
        lang="kal"
        caption="exprFstr.kal"
        code={[
            "var string = f(\"5 + 8 = {}\", (5 + 8)).",
            "stdout string \"\\n\"."
        ]}
        output={"5 + 8 = 13"}
    />

    There can be multiple placeholders and values to embed.
    
    <Code
        lang="kal"
        caption="multiFstr.kal"
        code={[
            "var string = f(\"{} + {} = {}\", 5, 8, (5 + 8)).",
            "stdout string \"\\n\"."
        ]}
        output={"5 + 8 = 13"}
    />

    You can nest formatted strings together.

    <Code
        lang="kal"
        caption="nestedFstr.kal"
        code={[
            "var string = f(",
            "    \"For{} {}\",",
            "    \"matted\",",
            "    f(",
            "        \"Str{}{}\",",
            "        \"ing\",",
            "        \"!\"",
            "    )",
            ").\n",
            "stdout string \"\\n\"."
        ]}
        output={"Formatted String!"}
    />

    You may need to extract values from lists and dictionaries into distinct variables. This is called unpacking.

    <br /><br />
    Use the list's <Fence>[</Fence> and <Fence>]</Fence> syntax to unpack variables from a list.

    <br /><br />
    First, let's see how values are extracted without unpacking.

    <Code
        lang="kal"
        caption="extractValues.kal"
        code={[
            "var data = [1, 2, 3].\n",
            "var x = data[0],",
            "    y = data[1],",
            "    z = data[2].\n",
            "stdout x \" \" y \" \" z \"\\n\"."
        ]}
        output={"1 2 3"}
    />

    Compact this using unpacking.

    <Code
        lang="kal"
        caption="unpack.kal"
        code={[
            "var data = [1, 2, 3].\n",
            "var [x, y, z] = data.\n",
            "stdout x \" \" y \" \" z \"\\n\"."
        ]}
        output={"1 2 3"}
    />

    You are not required to unpack all values. Consider unpacking 2 values from a list of 3 values.

    <Code
        lang="kal"
        caption="partialUnpack.kal"
        code={[
            "var data = [1, 2, 3].\n",
            "var [x, y] = data.\n",
            "stdout x \" \" y \"\\n\"."
        ]}
        output={"1 2"}
    />

    Values are unpacked sequentially. The placeholder symbol, <Fence>_</Fence> is used to maintain the sequence without unpacking a value from that position.

    <br /><br />
    Consider unpacking the first and third value from a list.

    <Code
        lang="kal"
        caption="placeholderUnpack.kal"
        code={[
            "var data = [1, 2, 3].\n",
            "var [x, _, z] = data.\n",
            "stdout x \" \" z \"\\n\"."
        ]}
        output={"1 3"}
    />

    The syntax can be nested to unpack more complex structures.
    
    <Code
        lang="kal"
        caption="nestedUnpack.kal"
        code={[
            "var data = [1, 2, [3, 4]].\n",
            "var [_, x, [_, y]] = data.\n",
            "stdout x \" \" y \"\\n\"."
        ]}
        output={"2 4"}
    />

    Here, data contains a nested list. The unpack syntax matches the same structure to extract 2 and 4.

    <br /><br />
    Similarly, values can be unpacked from dictionaries.

    <Code
        lang="kal"
        caption="dictUnpack.kal"
        code={[
            "var data = #(",
            "    planet -> \"Earth\",",
            "    species -> \"Human\"",
            ").\n",
            "var #(species) = data.",
            "stdout \"Hi \" species \"\\n\"."
        ]}
        output={"Hi Human"}
    />

    List and Dictionary unpacking syntaxes can be combined together in case of nested structure.

    <Code
        lang="kal"
        caption="combinedUnpack.kal"
        code={[
            "var data = [",
            "    \"Hi\",",
            "    \"Hello\",",
            "    #(",
            "        name -> \"Kal\",",
            "        runsOn -> \"Interpreter\"",
            "    )",
            "].\n",
            "var [_, greet, #(name)] = data.\n",
            "stdout greet \" \" name \"\\n\"."
        ]}
        output={"Hello Kal"}
    />

    Variables in Kal are evaluated as soon as they are initialized. It's possible to delay the evaluation to the point where the variable is actually used.

    <br /><br />
    Similar to a <Fence>var</Fence> statement, the <Fence>inert</Fence> statement declares a lazy variable.

    <Code
        lang="kal"
        caption="inert.kal"
        code={[
            "inert data = 5 + 8.",
            "stdout data \"\\n\"."
        ]}
        output={"13"}
    />

    In this case, the <Fence>data</Fence> variable was defined but its value was not evaluated immediately.
    It's evaluated when it is used on the next line.

    <br /><br />
    Let's look at another example which makes more sense.

    <Code
        lang="kal"
        caption="lazyEval.kal"
        code={[
            "var a = 20.\n",
            "inert x = a + 10.",
            "a = 90.\n",
            "stdout x \"\\n\"."
        ]}
        output={"100"}
    />

    Let's break this down line by line.
    <ul>
        <li>A variable <Fence>a</Fence> is initialized to value 20.</li>
        <li>An inert variable <Fence>x</Fence> is lazily initialized to expression <Fence>a + 10</Fence>. However, it's not evaluated immediately, so the final value 30 is never obtained.</li>
        <li><Fence>a</Fence> is reassigned to 90.</li>
        <li><Fence>x</Fence> is used by <Fence>stdout</Fence> and thus the expression <Fence>a + 10</Fence> is revisited and evaluated at this point. The value of a has changed to 90, therefore the final evaluated value of <Fence>x</Fence> becomes 90 + 10 = <Fence>100</Fence>.</li>
    </ul>

    <Card>
        Inert variables may cause unintended side-effects and must be used with caution.
    </Card>

    Since the evaluation is delayed for inert variables, you may use it in cases where regular variables may not work.

    <Code
        lang="kal"
        caption="noErrInert.kal"
        code={[
            "inert data = x + y. ;; no error\n",
            "var x = 200,",
            "    y = 100.\n",
            "stdout data \"\\n\"."
        ]}
        output={"300"}
    />

    So far you have used <Fence>stdout</Fence> which is used to write to the terminal. <Fence>stdin</Fence> allows you to read data from user input into a variable.

    <Code
        lang="kal"
        caption="stdin.kal"
        code={[
            "stdin \"Name? \" -> name.",
            "stdout \"Hello \" name \"\\n\"."
        ]}
    />
</Content>