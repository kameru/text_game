<script>
    import {TEXT_TYPE} from "../../const/const"
    import { getScenarioText, parseScenario } from "../../util.js";

    let scripts = [];
    let scenario = []
    const promise = getScenarioText('prologue').then((data) => {
        scenario = parseScenario(data);
        scripts.push(scenario.shift());
    });

    function goToNextText() {
        if (scenario.length === 0) {return;}
        if (scenario[0].type === TEXT_TYPE.CHOICE) {
            while (scenario[0] && scenario[0].type === TEXT_TYPE.CHOICE) {
                scripts.push(scenario.shift());
            }
            scripts = [...scripts];
        } else {
            scripts = [...scripts, scenario.shift()];
        }
    }
</script>

<svelte:window on:click="{goToNextText}"/>

{#await promise}
로딩 중...
{:then}
{#each scripts as script}
    {#if script.type === TEXT_TYPE.CHOICE} 
        <button>{script.text}</button>
        {:else}
        <p>{script.text}</p>
    {/if}
{/each}
{/await}

<style>
    button {
        width: 100%
    }
</style>