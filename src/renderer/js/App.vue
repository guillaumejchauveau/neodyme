<template>
    <div id="app">
        <playlist></playlist>
    </div>
</template>

<script>
    import Playlist from './Playlist/Playlist'
    
    export default {
        name      : 'app',
        components: {
            Playlist
        },
        data      : () => {
            return {}
        }
    }
</script>
