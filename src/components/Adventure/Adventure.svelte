<script>
    import { getScenarioText } from "../../util.js";

    let texts = [];
    let scenario = []
    const promise = getScenarioText('prologue').then((data) => {
        scenario = data;
        texts.push(scenario.shift());
    });

    function goToNextText() {
        if (scenario.length === 0) {return;}
        texts = [...texts, scenario.shift()];
    }
</script>

<svelte:window on:click="{goToNextText}"/>

{#await promise}
{null}
{:then}
{#each texts as text}
    <p>{text}</p>
{/each}
{/await}