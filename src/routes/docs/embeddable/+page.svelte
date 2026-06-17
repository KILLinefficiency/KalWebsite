<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Card from "$lib/components/Card.svelte";
    import Fence from "$lib/components/Fence.svelte";
    import Table from "$lib/components/Table.svelte";
</script>

<Content title="Embeddable Kal" desc="Powering other applications!" previous="/docs/ref" next="/docs/pykal">
    An embeddable language integrates with a host language. It acts like a guest inside an existing application and is often a small part of a larger existing application.

    <br /><br />
    Since Kal's interpreter is written in C++, it's very convenient to embed Kal into existing C++ applications. During Kal's installation, multiple object files were installed on the system.
    One of them was <Fence>libkal.a</Fence>. Along with it was a header file, <Fence>kal.hpp</Fence>.

    <br /><br />
    <Fence>libkal.a</Fence> is an archived object file that links with your C++ application to provide embeddable features, whereas <Fence>kal.hpp</Fence> is a text C++ header file that exposes the needed classes and methods.

    <br /><br />
    Let's begin with a simple Kal embed C++ program.

    <Code
        lang="cpp"
        caption="embedKal.cpp"
        code={[
            "#include <kal>\n",
            "int main(int argc, const char** argv) {",
            "    Kal kal = Kal();\n",
            "    kal.exec(R\"(\n        stdout \"Hello World\\n\".\n    )\");\n",
            "    return 0;",
            "}"
        ]}
        output={"Hello World"}
    />

    Compiling and running this program is very straightforward.

    <Code
        lang="bash"
        code={[
            "$ g++ embedKal.cpp -o embedKal -l:libkal.a",
            "$ ./embedKal"
        ]}
    />

    Let's break this <Fence>g++</Fence> invocation down:
    <ul>
        <li><Fence>g++</Fence> is a widely used C++ compiler.</li>
        <li><Fence>embedKal.cpp</Fence> is the source code.</li>
        <li><Fence>-o</Fence> flag is the output flag.</li>
        <li><Fence>embedKal</Fence> is the name of the executable to be produced.</li>
        <li><Fence>-l</Fence> is the linker flag.</li>
        <li><Fence>libkal.a</Fence> is Kal's object archive that you are linking <Fence>embedKal.cpp</Fence> with.</li>
    </ul>

    <Fence>./embedKal</Fence> is how you run the produced binary.

    <br /><br />
    <Fence>R"(...)"</Fence> is C++'s way of writing multiline strings. You can use normal strings as well, but as your Kal code inside the C++ program grows, multiline strings are a better option for readability.

    <br /><br />
    Let's understand the C++ program better. Linking <Fence>libkal.a</Fence> during <Fence>g++</Fence> invocation is what makes our program compile, but it won't know what classes and methods to use unless you explicitly tell it to. <Fence>kal.hpp</Fence> header file precisely does that for us.

    <br /><br />
    <Fence>#include &lt;kal&gt;</Fence> is where the <Fence>kal.hpp</Fence> header file is introduced in our code.

    <br /><br />
    In the <Fence>main</Fence> function you create an instance <Fence>kal</Fence> of the <Fence>Kal</Fence> object. You can have many instances of the Kal object. All of these instances live independently.

    <br /><br />
    The <Fence>exec</Fence> method on the kal object is where the execution of Kal code happens. The <Fence>exec</Fence> method takes in a string of Kal code to be executed.

    <br /><br />
    Not every part of your Kal code will be hard coded. You may want to pass a certain bit of information to it during runtime. This means passing data from C++ to Kal before Kal code execution.

    <br /><br />
    The <Fence>exec</Fence> method takes in an optional second argument. It's a collection of key value pairs to be passed the Kal code. The keys denote the dynamic part of the code to replace. All keys are replaced with their respective values in the Kal code.

    <br /><br />
    These dynamic variables in the Kal code start with a <Fence>$</Fence> sign.

    <Code
        lang="cpp"
        caption="dynamicVars.cpp"
        code={[
            "#include <kal>\n",
            "int main(int argc, const char** argv) {",
            "    Kal kal = Kal();",
            "    kal.exec(R\"(\n        stdout ($a + $b) \"\\n\".\n    )\", {",
            "        { \"a\", \"45\" }, { \"b\", \"55\" }",
            "    });\n",
            "    return 0;",
            "}"
        ]}
        output={"100"}
    />

    In this case, the values <Fence>45</Fence> and <Fence>55</Fence> aren't written directly inside the Kal code, rather they are passed from C++ to Kal externally.
    <Fence>$a</Fence> and <Fence>$b</Fence> are replaced with their respective values 45 and 55 as passed in the second argument of the <Fence>exec</Fence> method.

    <br /><br />
    This "table" of variables can also be declared beforehand and passed in later for readability.
    Let's rewrite the previous example, <Fence>dynamicVars.cpp</Fence> to be more readable.

    <Code
        lang="cpp"
        caption="dynamicVarsTable.cpp"
        code={[
            "#include <kal>\n",
            "int main(int argc, const char** argv) {",
            "    Kal kal = Kal();\n",
            "    Table table = {",
            "        { \"a\", \"45\" },",
            "        { \"b\", \"55\" }",
            "    };\n",
            "    kal.exec(R\"(\n        stdout ($a + $b) \"\\n\".\n    )\", table);\n",
            "    return 0;",
            "}"
        ]}
        output={"100"}
    />

    All primitive values: numbers, strings, lists, dicts and nulls can be passed dynamically as strings via tables.

    <br /><br />
    That's one way interaction: passing values from C++ to Kal. Similarly, you can also pass values from Kal to C++.
    That means, the result of the <Fence>exec</Fence> method can be used further in the C++ parts of your application.

    <br /><br />
    However, it's not straightforward. Kal is a dynamically typed language, whereas C++ is statically typed.
    The return value of the <Fence>exec</Fence> method after the Kal code executes is stored in a <Fence>Result</Fence> object.
    It's the programmer's responsibility to determine its type and evaluate to realize the actual value.
 
    <br /><br />
    You can use the return operator (<Fence>&lt;-</Fence>) to send data from Kal to C++. Perhaps an example would make things clear.

    <Code
        lang="cpp"
        caption="returnResult.cpp"
        code={[
            "#include <iostream>",
            "#include <kal>\n",
            "int main(int argc, const char** argv) {",
            "    Kal kal = Kal();\n",
            "    Result result = kal.exec(\"<- 125 * 4.\");\n",
            "    std::cout << result << \"\\n\";",
            "    double value = result.to_number();",
            "    std::cout << \"Value: \" << value << \"\\n\";\n",
            "    return 0;",
            "}"
        ]}
        output={"Result(500)\nValue: 500"}
    />

    Observe how in this example the return value of <Fence>exec</Fence> method is of type <Fence>Result</Fence>.
    The variable result stores the value 500. It can be previewed by directly printing it out.

    <br /><br />
    Since you are returning a value of a numerical type, the actual value can be realized by calling the <Fence>to_number</Fence> method on the <Fence>result</Fence> object.

    <br /><br />
    Depending on the type of value you are returning, <Fence>libkal</Fence> provides multiple methods to extract them.

    <Table
        header={["Kal Type", "libkal Method", "C++ Type"]}
        rows={[
            ["Numerical", "to_number()", "double"],
            ["String", "to_string()", "std::string"],
            ["List", "to_list()", "std::vector<Result>"],
            ["Dictionary", "to_dict()", "std::unordered_map<std::string, Result>"],
            ["Null", "to_null()", "bool"]
        ]}
    />

    <br />
    <Fence>to_string</Fence> method on <Fence>Result</Fence> type works very similar to <Fence>to_number</Fence> method.
    <br />
    <Fence>to_null</Fence> method returns <Fence>true</Fence> if the extracted value is <Fence>null</Fence>.

    <Code
        lang="cpp"
        caption="strAndNull.cpp"
        code={[
            "#include <iostream>",
            "#include <kal>\n",
            "int main(int argc, const char** argv) {",
            "    Kal kal = Kal();\n",
            "    Result result_str = kal.exec(R\"( <- \"Hello\". )\");",
            "    Result result_null = kal.exec(\"<- null\");\n",
            "    std::cout << result_str",
            "        << \"\\nString: \" << result_str.to_string()",
            "        << \"\\n\" << result_null",
            "        << \"\\nNull: \" << result_null.to_null() << \"\\n\";\n",
            "    return 0;",
            "}"
        ]}
        output={"Result(\"Hello\")\nString: Hello\nResult(null)\nNull: 1"}
    />

    Lists and Dictionaries are collections of values. Hence, returning lists and dictionaries are lazily evaluated.
    This means values inside lists and dictionaries are only evaluated and extracted when you access them. You can use the subscript operator (<Fence>[]</Fence>), to access the interval values.

    <br /><br />
    Internal values are also of the type <Fence>Result</Fence> when accessed. You always need to use the appropriate methods from the table above to coerce the <Fence>Result</Fence> object to give you those values in C++ types.

    <Code
        lang="cpp"
        caption="embedKalList.cpp"
        code={[
            "#include <iostream>",
            "#include <kal>\n",
            "int main(int argc, const char** argv) {",
            "    Kal kal = Kal();\n",
            "    Result list = kal.exec(R(\"<- [1, \"B\", 3].\"));",
            "    std::cout << list << \"\\n\";\n",
            "    Result x = list[0],",
            "        y = list[1],",
            "        z = list[2];\n",
            "    std::cout << x << \" \" << y << \" \" << z << \"\\n\";\n",
            "    double x_val = x.to_number();",
            "    std::string y_val = y.to_string();",
            "    double z_val = z.to_number();\n",
            "    std::cout << \"Values: \" << x_val",
            "        << \" \" << y_val",
            "        << \" \" << z_val << \"\\n\";\n",
            "    return 0;",
            "}"
        ]}
        output={"Result([1, \"B\", 3])\nResult(1) Result(\"B\") Result(3)\nValues: 1 B 3"}
    />


    To eagerly convert Kal lists to C++'s equivalent, use the to_list method on the <Fence>Result</Fence> object. It returns a C++ Vector of type <Fence>Result</Fence>. This way, you can store the internal <Fence>Result</Fence> object for long term use.

    <br />
    <Card>
        <Fence>to_list</Fence> resolves object to <Fence>{"std::vector<Result>"}</Fence>, the list itself is resolved, however the internal Result object will still require resolution based on their types.
    </Card>

    <br />
    Let's rewrite the <Fence>embedKalList.cpp</Fence> example using <Fence>to_list</Fence> method:

    <Code
        lang="cpp"
        caption="embedKalToList.cpp"
        code={[
            "#include <iostream>",
            "#include <kal>\n",
            "int main(int argc, const char** argv) {",
            "    Kal kal = Kal();\n",
            "    Result list = kal.exec(R\"(<- [1, \"B\", 3].)\");\n",
            "    std::cout << list << \"\\n\";\n",
            "    std::vector<Result> values = list.to_list();\n",
            "    for(const Result& result : values) {",
            "        std::cout << result << \" \";",
            "    }\n",
            "    std::cout << \"\\n\";\n",
            "    double x_val = values[0].to_number();",
            "    std::string y_val = values[1].to_string();",
            "    double z_val = values[2].to_number();\n",
            "    std::cout << \"Values: \" << x_val",
            "        << \" \" << y_val",
            "        << \" \" << z_val << \"\\n\";\n",
            "    return 0;",
            "}"
        ]}
        output={"Result([1, \"B\", 3])\nResult(1) Result(\"B\") Result(3)\nValues: 1 B 3"}
    />

    Kal Dictionaries function in a similar way. Let's consider a simple example for brevity.

    <Code
        lang="cpp"
        caption="kalEmbedDict.cpp"
        code={[
            "#include <iostream>",
            "#include <kal>\n",
            "using Dict = std::unordered_map<std::string, Result>;\n",
            "int main(int argc, const char** argv) {",
            "    Kal kal = Kal();\n",
            "    Result dict = kal.exec(R\"(\n        <- #(\n            name -> \"kal\",\n            pi -> 3.14\n        ).\n    )\");\n",
            "    std::cout << \"Dict: \" << dict << \"\\n\\n\";\n",
            "    Dict dict_values = dict.to_dict();",
            "    Dict::iterator itr;",
            "    for(itr = dict_values.begin(); itr != dict_values.end(); itr++) {",
            "        std::cout << itr->first << \" : \" << itr->second << \"\\n\";",
            "    }\n",
            "    std::string name = dict[\"name\"].to_string();",
            "    double pi = dict[\"pi\"].to_number();\n",
            "    std::cout << \"\\nName: \" << name",
            "        << \"\\nPi: \" << pi << \"\\n\";\n",
            "    return 0;",
            "}"
        ]}
        output={"Dict: Result(#(name -> \"kal\", pi -> 3.14))\n\nname : Result(\"kal\")\npi : Result(3.14)\n\nName: kal\nPi: 3.14"}
    />

    <Card>
        C++ programs link with <Fence>libkal.a</Fence> statically, therefore compiled executables can be used and distributed without requiring <Fence>libkal.a</Fence>.
        It is only needed during compile time.
    </Card>

</Content>