<script>
    import Content from "$lib/components/Content.svelte";
    import Code from "$lib/components/Code.svelte";
    import Card from "$lib/components/Card.svelte";
    import Fence from "$lib/components/Fence.svelte";
    import Table from "$lib/components/Table.svelte";
</script>

<Content title="PyKal" desc="Wait... it can do that!?" previous="/docs/embeddable" next="/docs/jskal">
    What if you could embed Kal not only in C++, but in Python as well?

    <br /><br />
    PyKal is an official Python library that provides bindings for a Python program to communicate with libkal.
    Previously, you linked C++ programs with the static <Fence>libkal.a</Fence> library.
    During installation, a dynamic library <Fence>libkal.so</Fence> is also compiled and installed.

    <br /><br />
    PyKal binds your Python program with <Fence>libkal.so</Fence> to allow execution of Kal code right inside your application.

    <br /><br />
    Install PyKal using <Fence>pip3</Fence>:

    <Code
        lang="bash"
        code={["$ pip3 install pykal"]}
    />

    <Card>
        You may be required to set up a Python Virtual Environment before installing PyKal.
    </Card>

    <br />
    Let's write a simple Python program demonstrating PyKal to get started.    

    <Code
        lang="py"
        caption="helloPykal.py"
        code={[
            "from pykal import Kal\n",
            "kal = Kal()\n",
            "kal.exec('stdout \"Hello PyKal\\n\".')"
        ]}
        output={"Hello PyKal"}
    />

    Let's break this program down:
    <ul>
        <li><Fence>Kal</Fence> class is imported from the <Fence>pykal</Fence> library.</li>
        <li>An instance, <Fence>kal</Fence> of the <Fence>Kal</Fence> class is created.</li>
        <li>The <Fence>exec</Fence> method of the <Fence>Kal</Fence> class is invoked to run Kal code which is passed as a string in the first parameter.</li>
    </ul>

    <Card>
        PyKal is not a reimplementation of Kal in Python.
        It's rather an abstraction that utilizes Foreign Function Interface (FFI) to interact directly with <Fence>libkal.so</Fence> to execute Kal code.
    </Card>

    <br />
    Every Kal instance reads the <Fence>libkal.so</Fence> file. As per default installation, it reads the file at: <Fence>/usr/local/lib/libkal.so</Fence>.
    If you have installed <Fence>libkal.so</Fence> elsewhere or are using a custom build, pass the correct absolute path to the constructor of the Kal class to override the default path.

    <Code
        lang="py"
        caption="customLibKal.py"
        code={[
            "from pykal import Kal\n",
            "kal = Kal('/home/me/Kal/bin/libkal.so')\n",
            "kal.exec('stdout \"Hello PyKal\\n\".')"
        ]}
        output={"Hello PyKal"}
    />

    To dynamically pass variables to Kal via Python, embed them using the <Fence>$</Fence> symbol and pass values in a dictionary as the second parameter to the <Fence>exec</Fence> method.

    <Code
        lang="py"
        caption="dynVar.py"
        code={[
            "from pykal import Kal\n",
            "kal = Kal()\n",
            "kal.exec(",
            "    \"\"\"\n        stdout ($a + $b) \"\\n\".\n    \"\"\",",
            "    {",
            "        'a': 45,",
            "        'b': 55",
            "    }",
            ")"
        ]}
        output={"100"}
    />

    <Fence>{"\"\"\"...\"\"\""}</Fence> is Python's way of writing multiline strings.

    <br /><br />
    PyKal also provides a <Fence>Result</Fence> object that stores the return value of an executed Kal code snippet.

    The <Fence>{"<-"}</Fence> operator can be used in the Kal code to return a value to the Python host program.

    <Code
        lang="py"
        caption="pykalResult.py"
        code={[
            "from pykal import Kal\n",
            "kal = Kal()",
            "value = kal.exec('<- 125 * 4.')\n",
            "print(value)",
            "print(value.to_number())",
            "print(type(value))"
        ]}
        output={"Result(500)\n500.0\n&lt;class 'pykal.result.Result'&gt;"}
    />

    A <Fence>Result</Fence> object can be previewed by printing it out. The <Fence>to_number</Fence> method on the object in this case extracts the value by converting it to its equivalent Python type.

    <br /><br />
    Similarly, depending on the value you are returning, PyKal provides multiple methods to extract values from the <Fence>Result</Fence> object.

    <br /><br />
    <Table
        header={["Kal Type", "PyKal Method", "Python Type"]}
        rows={[
            ["Numerical", "to_number()", "float"],
            ["String", "to_string()", "str"],
            ["List", "to_list()", "list[Result]"],
            ["Dictionary", "to_dict()", "dict[str, Result]"],
            ["Null", "to_null()", "bool"]
        ]}
    />

    <br />
    Complex values such as lists and dictionaries can also be passed to the <Fence>exec</Fence> method. PyKal will implicitly convert Python types to Kal types.

    <br /><br />
    A complex value can be converted using <Fence>to_list</Fence> or <Fence>to_dict</Fence> method. However, this only converts the data structure itself, not the internal values. Those can be converted implicitly using the appropriate methods.

    <br /><br/>
    Consider this Kal code example which accepts a list from Python and returns a list of first, middle and last elements back to Python.
    <Code
        lang="py"
        caption="pykalList.py"
        code={[
            "from pykal import Kal\n",
            "kal = Kal()\n",
            "result = kal.exec(",
            "    \"\"\"\n        var data = $data.\n\n        len data -> size.\n        first data -> f.\n        last data -> l.\n        var m = data[(size / 2) as int].\n\n        <- [f, m, l].\n    \"\"\",",
            "    {",
            "        'data': [1, 2, 3, 4, 5]",
            "    {",
            ")\n",
            "print('Return Value:', result, '\\n')\n",
            "for r in result.to_list():",
            "    print(r, r.to_number())"
        ]}
        output={"Return Value: Result([1, 3, 5])\n\nResult(1) 1.0\nResult(3) 3.0\nResult(5) 5.0"}
    />

    Similar behavior can be observed with dictionaries.

    <Code
        lang="py"
        caption="pykalDict.py"
        code={[
            "from pykal import Kal\n",
            "kal = Kal()\n",
            "result = kal.exec(",
            "    \"\"\"\n        var data = $data.\n        <- #(sum -> data[\"x\"] + data[\"y\"]).\n    \"\"\",",
            "    {",
            "        'data': { 'x': 75, 'y': 25 }",
            "    }",
            ")\n",
            "print(result)",
            "result_dict = result.to_dict()",
            "print(result_dict)",
            "print('Sum:', result_dict['sum'].to_number())"
        ]}
        output={"Result(#(sum -> 100))\n{'sum': Result(100)}\nSum: 100.0"}
    />

    You can have multiple instances of the <Fence>Kal</Fence> class in your Python program. All of them maintain their memory maps separately.

    <Code
        lang="py"
        caption="multipleKal.py"
        code={[
            "from pykal import Kal\n",
            "kalA = Kal()",
            "kalB = Kal()",
            "kalC = Kal()\n",
            "kalA.exec('var x = 10.')",
            "kalB.exec('var x = 20.')",
            "kalC.exec('var x = 30.')\n",
            "kalA.exec('stdout x \"\\n\".')",
            "kalB.exec('stdout x \"\\n\".')",
            "kalC.exec('stdout x \"\\n\".')"
        ]}
        output={"10\n20\n30"}
    />

    <Card>
        PyKal binds with <Fence>libkal.so</Fence> dynamically. Therefore, <Fence>libkal.so</Fence> is required during runtime. PyKal programs can't execute without it.
    </Card>

</Content>