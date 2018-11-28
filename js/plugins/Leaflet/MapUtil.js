"use strict";
define([
    'css!plugins/Leaflet/leaflet.search.min.css',
    // 'css!plugins/Leaflet/L.Control.Basemaps.css',
    'css!plugins/Leaflet/MarkerCluster.css',
    'css!plugins/Leaflet/leaflet.marker.highlight.css',
    'css!plugins/Leaflet/leaflet-search.css',
    'css!plugins/Leaflet/MarkerCluster.Default.css',
    'plugins/Leaflet/leaflet.providers',
    // 'plugins/Leaflet/leaflet',
    'plugins/Leaflet/leaflet.awesome-markers',
    'plugins/Leaflet/leaflet.markercluster',
    // 'Leaflet/Leaflet.activearea',
    'plugins/Leaflet/leaflet-search',
    'plugins/Leaflet/leaflet.marker.highlight',
    'plugins/Leaflet/L.Control.Basemaps',
    'plugins/Leaflet/leaflet.markercluster.freezable'
], function () {
    //TODO 可以在此做一些地图的处理
    var MapUtil = {
        ready: false,
        Cache: [], // 缓存数据
        Instance: function (id, option) {
            this.ready = !!(window.L);
            var self = this;

            try {
                if (this.Cache[id]) {
                    this.Cache[id].map && this.Cache[id].map.remove();
                }
                var p = this.option = {
                    map: {},
                    option: $.extend(true, {
                        controls: {
                            zoomControl: {
                                show: true,
                                position: 'bottomright',
                                zoomInTitle: $.getI18n('enlargement'),
                                zoomOutTitle: $.getI18n('decrease')
                            },
                            scaleControl: {
                                show: true,
                                position: 'bottomright'
                            },
                            searchControl: {
                                show: false
                            }
                        }
                    }, option),
                    container: id
                };

                // 创建地图实例
                p.map = L.map(p.container, {
                    center: p.option.center || [],
                    zoom: p.option.zoomLevel || 5,
                    minZoom: 3,
                    maxZoom: 15,
                    layers: p.option.layers,
                    zoomControl: false,
                    attributionControl: false,
                    inertia: true,
                    worldCopyJump: true,
                    keyboard: false,
                    //maxBounds: [[0, 0], [180, 90], [-180, -90]]
                });

                /* TODO 添加控件 */
                if (p.option.controls) {
                    // 比例尺
                    if (p.option.controls.scaleControl && p.option.controls.scaleControl.show) {
                        p.map.addControl(L.control.scale({
                            position: p.option.controls.scaleControl.position || 'bottomleft',
                            maxWidth: p.option.controls.scaleControl.maxWidth || 100,
                            metric: p.option.controls.scaleControl.metric || true,
                            imperial: p.option.controls.scaleControl.imperial || true
                        }));
                    }
                    // 缩放控件
                    if (p.option.controls.zoomControl && p.option.controls.zoomControl.show) {
                        p.map.addControl(L.control.zoom({
                            position: p.option.controls.zoomControl.position || 'topleft',
                            zoomInText: p.option.controls.zoomControl.zoomInText || '+',
                            zoomInTitle: p.option.controls.zoomControl.zoomInTitle || 'Zoom in',
                            zoomOutText: p.option.controls.zoomControl.zoomOutText || '-',
                            zoomOutTitle: p.option.controls.zoomControl.zoomOutTitle || 'Zoom out'
                        }));
                    }
                }

                this.Cache[id] = this.option;
            }catch (e){
                console.log(e)
            }
            return this;
        },

        /**
         * 创建图标（Icon）
         * @param options 图标样式参数
         * <pre>
         *     {
         *          iconUrl: './images/marker-icon.png', // 图标图片地址
         *          iconSize: [38, 95], // 图标大小[x, y]
         *          iconAnchor: [22, 94], // 图标标识中心位置[x, y]
         *          popupAnchor: [-3, -76], // 弹出层指向图标位置[x, y]
         *          shadowUrl: './images/marker-shadow.png', // 图标阴影图层
         *          shadowSize: [68, 95], // 阴影大小[x, y]
         *          shadowAnchor: [22, 94] // 阴影标识中心位置[x, y]
         *     }
         * </pre>
         * @returns {* || o.Icon || L.AwesomeMarkers.Icon}
         */
        createIcon: function (options) {
            if (!this.ready) return null;
            var icon = L.icon($.extend({
                iconUrl: '/js/Leaflet/images/marker-icon.png',
                iconSize: [25, 38],
                iconAnchor: [15, 36],
                popupAnchor: [-1, -50],
                shadowUrl: '/js/Leaflet/images/marker-shadow.png',
                shadowSize: [25, 38],
                shadowAnchor: [13, 38]
            }, options));
            return icon || L.Icon.Default();
        },

        /**
         * 创建标注点(Marker)
         *
         * @param point {L.point} 点对象
         * @param options {*} 参数
         *  <pre>
         *      {<br>
         *          icon: L.Icon.Default(), // {L.Icon || L.AwesomeMarkers.Icon} 默认图标<br>
         *          draggable: true, // 使图标可拖拽<br>
         *          title: 'Title', // 添加一个标题<br>
         *          opacity: 0.5 // 设置透明度<br>
         *      }<br>
         *  </pre>
         * @return {Marker}
         */
        createMarker: function (point, options) {
            if (!this.ready) return null;
            options = $.extend({
                draggable: false,
                opacity: 1
            }, options);
            options.isDivIcon &&  (options.icon = L.divIcon(options));
            var marker = L.marker(point, options);
            options.popup && marker.bindPopup(options.popup, {
                autoPan: true,
                keepInView: true,
                maxWidth: 950,
                closeButton: false,
                autoPanPadding: [15, 15]
            }).openPopup();
            options.tooltip && marker.bindTooltip(options.tooltip, {
                direction: 'right',
                permanent: false,
                opacity: 0,
                className : 'anim-tooltip',// CSS控制
                // offset: [8, -8]
            }).openTooltip();
            // 添加事件
            if (options && options.events) {
                for (var event in options.events) {
                    options.events.hasOwnProperty(event)
                    && options.events[event]
                    && (typeof options.events[event] == 'function')
                    && marker.on(event, function (e) {
                        options.events[e.type](e);
                    });
                }
            }
            return marker;
        },

        /**
         * 添加一个标注点到地图
         * @param map {Map} 地图
         * @param marker {Marker} 标注点对象
         */
        addMarker: function (map, marker) {
            if (!this.ready) return this;
            marker && marker.addTo(map);
            return this;
        },
        /**
         * 添加一个标注点集合到地图
         * @param map {Map} 地图
         * @param markers [{Marker}] 标注点数组对象
         */
        addMarkers: function (map, markers) {
            if (!this.ready) return this;
            $.each(markers,function (idx,item) {
                item && item.addTo(map);
            })
            return this;
        },

        /**
         * 添加若干个注点到地图，并返回点聚合对象
         * @param map {Map} 地图对象
         * @param cluster {MarkerClusterGroup} 点聚合对象，如果不存在，会自动创建一个聚合对象
         * @param markers {Array<Marker>} 标注点数组
         * @return {* || MarkerClusterGroup} 返回添加点聚合对象
         */
        addCluster: function (map, cluster, markers,options) {
            if (!this.ready) return {};
            if (markers && markers.length > 0) {
                if (!cluster) {
                    cluster = new L.MarkerClusterGroup($.extend({
                        spiderfyOnMaxZoom: true,
                        showCoverageOnHover: false,
                        zoomToBoundsOnClick: true,
                        maxClusterRadius: 120,
                        spiderLegPolylineOptions: {
                            weight: 1.5,
                            color: '#222',
                            opacity: 0.5
                        }
                    },options));
                }

                for (var i = 0; i < markers.length; i++) {
                    cluster.addLayer(markers[i]);
                }

                map && map.addLayer && map.addLayer(cluster);
            }
            return cluster;
        },

        /**
         * 清除地图
         * @param map
         * @return {MapUtil}
         */
        clearMap: function (map) {
            if (!this.ready) return this;
            map.remove();
            return this;
        },
        /**
         * 添加地图搜索控件
         * @param map
         * @param layerGroup {L.layerGroup}
         * @param options
         * @returns {*}
         */
        addSearchControl: function (map, layerGroup, options,funcs) {
            if (!this.ready) return {};
            var searchControl = new L.Control.Search($.extend({
                position: 'topleft',
                layer: layerGroup,
                initial: false,
                zoom: 10,
                marker: false,
                propertyName: 'tooltip',
                collapsed: false,
                textErr: $.getI18n('noFind'),	//error message
                textCancel: $.getI18n('cancel'),		    //title in cancel button
                textPlaceholder: $.getI18n('searchPlant')   //placeholder value
            }, options));
            map && map.addControl && map.addControl(searchControl);

            return searchControl;
        },
        /**
         * 添加地图导航控件
         * @param map
         * @param layerGroup {L.layerGroup}
         * @param options
         * @returns {*}
         */
        addNavControl: function (map, layerGroup, options) {
            if (!this.ready) return {};
            L.Control.Nav = L.Control.extend({
                options: {
                    position: 'topleft'
                },
                initialize: function (options) {
                    L.Util.extend(this.options, options);

                },
                onAdd: function (map) {
                    //创建一个class为leaflet-control-navigation的div
                    this._container = L.DomUtil.create('div', 'leaflet-control-navigation');
                    this._containerL = L.DomUtil.create('div', 'leaflet-control-navigation_l');
                    this._containerC = L.DomUtil.create('div', 'leaflet-control-navigation_c');
                    this._containerR = L.DomUtil.create('div', 'leaflet-control-navigation_r');
                    this._containerC.id = 'leafletControlNav';
                    //创建导航标签
                    var navbutton = document.createElement('a');
                    navbutton.id = 'leafletControlNavNode';
                    navbutton.className = 'leaflet-control-nav';
                    navbutton.innerHTML = options.rootName;

                    this._container.appendChild(this._containerL);
                    this._container.appendChild(this._containerC);
                    this._container.appendChild(this._containerR);
                    this._containerC.appendChild(navbutton);

                    return this._container;
                }
            });
            map && map.addControl && map.addControl(new L.Control.Nav(
                {
                    options: $.extend({
                        position: 'topleft',
                        layer: layerGroup,
                    }, options)
                }
            ));

            return L.Control.Nav;
        },

        /**
         * 创建layerGroup, 用于保存电子围栏, 电站域, 电站等的标注信息, 重绘前可以方便的直接删除整个layerGroup
         * @param map
         * @returns {*}
         */
        createMarkerGroup: function (map) {
            var markerGroup = L.layerGroup().addTo(map);
            return markerGroup;
        },

        /**
         * 绘制圆
         * @param map
         * @param center {LatLng} 圆心经纬度坐标
         * @param radius {Number} 半径
         * @param properties {Object}
         */
        circle: function (map, center, radius, properties) {
            return new L.circle(center,
                $.extend({
                    opacity: (properties && properties.opacity) || 0.2,
                    color: (properties && properties.color) || "orange", //线颜色
                    fillColor: (properties && properties.fillColor) || "#ff0", //填充颜色
                    fillOpacity: (properties && properties.fillOpacity) || 0.6,//填充透明度
                    radius: radius
                },properties)).addTo(map);
        },

        /**
         * 使地图自适应显示到合适的范围
         *
         * @return {LatLng} 新的中心点
         */
        fitView: function (map,params) {
            if(!(map && map.getCenter)) return;
            if (!this.ready) return map.getCenter();
            var bounds = new L.LatLngBounds();
            map.eachLayer(function (t, e) {
                try {
                    if (typeof(t.getBounds)=="function") {
                        t.getBounds() && bounds.extend(t.getBounds());
                    } else if (typeof(t.getLatLng)=="function") {
                        t.getLatLng() && bounds.extend(t.getLatLng());
                    }
                } catch (e) {
                }
            });
            //当地图上无任何域或者电站显示时, 不做fitBounds操作
            return bounds.isValid() && map.fitBounds(bounds,params);
        },

    };
    return MapUtil;
});