<script>
import { onMount } from "svelte";

import {TEXT_TYPE} from "../../const/const"
import { getScenarioText, parseScenario } from "../../util.js";
import ChoiceButton from "./ChoiceButton.svelte";

    let scripts = [];
    let scenario = [];

    async function getScenario (filename) {
        await getScenarioText(filename).then((data) => {
            scenario.unshift(...parseScenario(data))
        });
    }

    let promise = getScenario('prologue').then(() => {
        scripts = [...scripts, scenario.shift()];            
    });
    
    function goToNextText() {
        if (scenario.length === 0) {return;}
        if (scenario[0].type === TEXT_TYPE.JUMP) {
            getScenario(scenario[0].label).then(() => {
                scripts = [...scripts, scenario.shift()];            
            });
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
        <ChoiceButton {script} onChoice="{(script) => {scenario.push(script)}}"/>
        {:else}
        <p>{script.text}</p>
    {/if}
{/each}
{/await}

