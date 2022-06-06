<script>
  import Title from './components/Title.svelte'
  import Adventure from './components/Adventure/Adventure.svelte';

  let _mode = 'TITLE'
  const changeMode = (mode='ADVENTURE') => {
    _mode = mode;
  };
</script>

<main>
  {#if _mode === 'ADVENTURE'}
    <Adventure/>
    {:else}
    <Title start={changeMode}/>
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(button) {
    border: black solid 1px;
    background-color: white;
  }
  :global(button:active) {
    background-color:whitesmoke;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
