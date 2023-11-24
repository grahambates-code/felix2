// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CompositeLayer } from '@deck.gl/core/typed';
import { GLTFLoader } from '@loaders.gl/gltf';
import { registerLoaders } from '@loaders.gl/core';
import { BitmapLayer } from '@deck.gl/layers/typed';
import { TileLayer } from '@deck.gl/geo-layers/typed';

registerLoaders([GLTFLoader]);

interface MapProps {}

class Map extends CompositeLayer<MapProps> {
    initializeState(params?: any) {
        super.initializeState(params);
    }

    shouldUpdateState(p) {
        return p.changeFlags.somethingChanged;
    }

    renderLayers() {

       // console.log(this.props.id);
        const map = new TileLayer({
            data: [
                'https://api.mapbox.com/styles/v1/mogmog/clfgzpmgm006b01s2e6dkqbgu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw',
            ],

           id : "Tile" + this.props.id,
            maxRequests: 20,

            renderSubLayers: (props): SubLayerProps => {
                return [
                    new BitmapLayer(props, {
                        ...props,
                        data: undefined,
                        image: props.data,
                        bounds: [
                            props.tile.bbox.west,
                            props.tile.bbox.south,
                            props.tile.bbox.east,
                            props.tile.bbox.north
                        ],
                        desaturate: this.props.desaturate
                    })
                ];
            }
        });

        return [map];
    }
}

Map.layerName = 'Map';

export default Map;
