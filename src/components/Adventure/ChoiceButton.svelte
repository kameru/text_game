<script>
    export let script;
    export let onChoice;

    let finished = false
</script>

{#each script.buttons as button}
    <button disabled={finished} on:click="{() => {finished = true; onChoice(button.next)}}">{button.text}</button>
{/each}

<style>
    button {
        width: 100%
    }
</style>