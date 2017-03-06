<template>
    <div id="playlist">
        <div class="playlist-content">
            <tracks-list></tracks-list>
            <control-panel></control-panel>
        </div>
    </div>
</template>

<script>
    import ControlPanel from './ControlPanel/ControlPanel'
    import TracksList from './TracksList/TracksList'
    
    export default {
        components: {
            ControlPanel,
            TracksList
        }
    }
</script>

<style scoped>
    @import "loader";
    
    #playlist {
        @include position(fixed, 0 null 0 0);
        
        .playlist-content {
            @include centered;
            left          : 0;
            width         : $controlPanel-size*2;
            height        : $controlPanel-size*2;
            border-radius : 50%;
        }
    }
</style>
