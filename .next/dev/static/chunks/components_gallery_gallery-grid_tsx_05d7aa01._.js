(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/gallery/gallery-grid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GalleryGrid",
    ()=>GalleryGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const galleryItems = [
    {
        id: 1,
        type: "image",
        src: "/african-students-planting-trees-at-school.jpg",
        category: "Education",
        title: "Youth Tree Planting",
        description: "Students participating in our Green Schools Initiative",
        size: "large"
    },
    {
        id: 2,
        type: "image",
        src: "/beach-cleanup-volunteers-tanzania-coast.jpg",
        category: "Cleanup",
        title: "Beach Cleanup Drive",
        description: "Monthly beach cleanup drive in Dar es Salaam",
        size: "normal"
    },
    {
        id: 3,
        type: "image",
        src: "/african-farmers-sustainable-agriculture.jpg",
        category: "Agriculture",
        title: "Sustainable Farming",
        description: "Training communities in eco-friendly farming practices",
        size: "tall"
    },
    {
        id: 4,
        type: "image",
        src: "/african-women-environmental-leaders-tanzania.jpg",
        category: "Women Empowerment",
        title: "Binti Mazingira Workshop",
        description: "Young women leading environmental change",
        size: "normal"
    },
    {
        id: 5,
        type: "image",
        src: "/tree-planting-tanzania-youth-reforestation.jpg",
        category: "Reforestation",
        title: "Tuelimishe Mazingira",
        description: "Large-scale tree planting campaign",
        size: "normal"
    },
    {
        id: 6,
        type: "image",
        src: "/african-youth-planting-trees-in-tanzania--lush-gre.jpg",
        category: "Community",
        title: "Community Action Day",
        description: "Local communities restoring green spaces",
        size: "wide"
    },
    {
        id: 7,
        type: "image",
        src: "/tree-planting-in-tanzania--environmental-conservat.jpg",
        category: "Conservation",
        title: "Forest Restoration",
        description: "Restoring degraded forest areas",
        size: "normal"
    },
    {
        id: 8,
        type: "image",
        src: "/african-community-gathering--empowerment-workshop.jpg",
        category: "Workshops",
        title: "Empowerment Workshop",
        description: "Community environmental education sessions",
        size: "normal"
    },
    {
        id: 9,
        type: "image",
        src: "/young-african-leaders--youth-empowerment-tanzania.jpg",
        category: "Education",
        title: "Youth Leadership Summit",
        description: "Empowering the next generation of environmental leaders",
        size: "normal"
    },
    {
        id: 10,
        type: "image",
        src: "/sustainable-farming-tanzania--eco-friendly-develop.jpg",
        category: "Agriculture",
        title: "Organic Farming Initiative",
        description: "Teaching sustainable agricultural practices to local farmers",
        size: "large"
    },
    {
        id: 11,
        type: "image",
        src: "/eco-tourism-tanzania-wildlife-guides-nature.jpg",
        category: "Conservation",
        title: "Eco-Tourism Training",
        description: "Building sustainable livelihoods through conservation",
        size: "normal"
    },
    {
        id: 12,
        type: "image",
        src: "/urban-garden-tanzania-rooftop-farming-vegetables-c.jpg",
        category: "Community",
        title: "Urban Gardens Project",
        description: "Creating green spaces in urban communities",
        size: "tall"
    }
];
const categories = [
    "All",
    "Education",
    "Cleanup",
    "Reforestation",
    "Women Empowerment",
    "Community",
    "Conservation",
    "Agriculture",
    "Workshops"
];
function GalleryGrid() {
    _s();
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [selectedItem, setSelectedItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const filteredItems = selectedCategory === "All" ? galleryItems : galleryItems.filter((item)=>item.category === selectedCategory);
    const getGridClass = (size)=>{
        switch(size){
            case "large":
                return "col-span-1 md:col-span-2 row-span-1";
            case "tall":
                return "col-span-1 row-span-1 md:row-span-2";
            case "wide":
                return "col-span-1 md:col-span-2 row-span-1";
            default:
                return "col-span-1 row-span-1";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-20 sm:py-28 bg-background",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap justify-center gap-3 mb-12",
                    children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setSelectedCategory(category),
                            className: `px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${selectedCategory === category ? "bg-emca-primary text-white" : "bg-card text-muted-foreground hover:bg-muted border-2 border-border"}`,
                            children: category
                        }, category, false, {
                            fileName: "[project]/components/gallery/gallery-grid.tsx",
                            lineNumber: 157,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/gallery/gallery-grid.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-4",
                    children: filteredItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${getGridClass(item.size)} group relative rounded-2xl overflow-hidden cursor-pointer border-2 border-border hover:border-emca-primary/40 transition-all duration-500`,
                            onClick: ()=>setSelectedItem(item),
                            style: {
                                animation: `fade-in 0.5s ease-out ${index * 0.05}s both`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: item.src || "/placeholder.svg",
                                    alt: item.title,
                                    fill: true,
                                    className: "object-cover group-hover:scale-105 transition-transform duration-700 ease-out",
                                    loading: "lazy",
                                    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                }, void 0, false, {
                                    fileName: "[project]/components/gallery/gallery-grid.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-t from-emca-darkest/90 via-emca-darkest/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-0 right-0 p-6 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block px-3 py-1 bg-emca-yellow text-emca-darkest text-xs font-medium rounded-2xl",
                                                children: item.category
                                            }, void 0, false, {
                                                fileName: "[project]/components/gallery/gallery-grid.tsx",
                                                lineNumber: 193,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-pompiere text-white",
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/components/gallery/gallery-grid.tsx",
                                                lineNumber: 196,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-white/80 line-clamp-2",
                                                children: item.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/gallery/gallery-grid.tsx",
                                                lineNumber: 197,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/gallery/gallery-grid.tsx",
                                        lineNumber: 192,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/gallery/gallery-grid.tsx",
                                    lineNumber: 191,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/components/gallery/gallery-grid.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/gallery/gallery-grid.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this),
                selectedItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in",
                    onClick: ()=>setSelectedItem(null),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            className: "absolute top-4 right-4 text-white hover:bg-white/20 rounded-2xl h-12 w-12",
                            onClick: ()=>setSelectedItem(null),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-6 w-6"
                            }, void 0, false, {
                                fileName: "[project]/components/gallery/gallery-grid.tsx",
                                lineNumber: 216,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/gallery/gallery-grid.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-5xl w-full space-y-4",
                            onClick: (e)=>e.stopPropagation(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative aspect-video w-full rounded-2xl overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: selectedItem.src || "/placeholder.svg",
                                        alt: selectedItem.title,
                                        fill: true,
                                        className: "object-contain",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/gallery/gallery-grid.tsx",
                                        lineNumber: 220,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/gallery/gallery-grid.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-card rounded-2xl p-6 space-y-2 border-2 border-border",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block px-3 py-1 bg-emca-primary text-white text-sm font-medium rounded-2xl",
                                            children: selectedItem.category
                                        }, void 0, false, {
                                            fileName: "[project]/components/gallery/gallery-grid.tsx",
                                            lineNumber: 229,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-pompiere text-foreground",
                                            children: selectedItem.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/gallery/gallery-grid.tsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base text-muted-foreground",
                                            children: selectedItem.description
                                        }, void 0, false, {
                                            fileName: "[project]/components/gallery/gallery-grid.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/gallery/gallery-grid.tsx",
                                    lineNumber: 228,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/gallery/gallery-grid.tsx",
                            lineNumber: 218,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/gallery/gallery-grid.tsx",
                    lineNumber: 206,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/gallery/gallery-grid.tsx",
            lineNumber: 153,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/gallery/gallery-grid.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
_s(GalleryGrid, "LN5YNFHL2swE5pBXQFj/bZC3dgA=");
_c = GalleryGrid;
var _c;
__turbopack_context__.k.register(_c, "GalleryGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_gallery_gallery-grid_tsx_05d7aa01._.js.map