<script>
    let { header = ["Hello", "World","ABC"], rows } = $props();
</script>

<style>
    table {
        border-collapse: collapse;
    }
    th, td {
        padding: 20px;
        text-align: center;
    }
    th:first-child {
        border-top-left-radius: 10px;
    }
    th:last-child {
        border-top-right-radius: 10px;
    }
    tr:last-child td:first-child {
        border-bottom-left-radius: 10px;
    }
    tr:last-child td:last-child {
        border-bottom-right-radius: 10px;
    }
    tr:nth-child(odd) {
        background-color: var(--base);
    }
    tr:not(:first-child):hover {
        color: var(--green);
        font-weight: bold;
    }
</style>

<table>
    <tbody>
        <tr>
            {#each header as head}
                <th>{head}</th>
            {/each}
        </tr>

        {#each rows as row}
            <tr>
                {#each row as item}
                    <td>{item}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

