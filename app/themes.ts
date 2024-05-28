import { CustomFlowbiteTheme } from 'flowbite-react';

export const themes: CustomFlowbiteTheme = {
    button: {
        "base": "group relative flex items-stretch justify-center p-0.5 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none",
        "fullSized": "w-full",
        "color": {
            "dark": "border border-transparent bg-gray-800 text-white focus:ring-4 focus:ring-gray-300 enabled:hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-800 dark:enabled:hover:bg-gray-700",
            "failure": "border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:focus:ring-red-900 dark:enabled:hover:bg-red-700",
            "gray": ":ring-cyan-700 border border-gray-200 bg-white text-gray-900 focus:text-cyan-700 focus:ring-4 enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:bg-gray-700 dark:enabled:hover:text-white",
            "info": "border border-transparent bg-cyan-700 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700",
            "light": "border border-gray-300 bg-white text-gray-900 focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:focus:ring-gray-700 dark:enabled:hover:border-gray-700 dark:enabled:hover:bg-gray-700",
            "purple": "border border-transparent bg-purple-700 text-white focus:ring-4 focus:ring-purple-300 enabled:hover:bg-purple-800 dark:bg-purple-600 dark:focus:ring-purple-900 dark:enabled:hover:bg-purple-700",
            "success": "border border-transparent bg-green-700 text-white focus:ring-4 focus:ring-green-300 enabled:hover:bg-green-800 dark:bg-green-600 dark:focus:ring-green-800 dark:enabled:hover:bg-green-700",
            "warning": "border border-transparent bg-yellow-400 text-white focus:ring-4 focus:ring-yellow-300 enabled:hover:bg-yellow-500 dark:focus:ring-yellow-900",
            "blue": "border border-transparent bg-blue-700 text-white focus:ring-4 focus:ring-blue-300 enabled:hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
            "cyan": "border border-cyan-300 bg-white text-cyan-900 focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-100 dark:border-cyan-600 dark:bg-cyan-600 dark:text-white dark:focus:ring-cyan-700 dark:enabled:hover:border-cyan-700 dark:enabled:hover:bg-cyan-700",
            "green": "border border-green-300 bg-white text-green-900 focus:ring-4 focus:ring-green-300 enabled:hover:bg-green-100 dark:border-green-600 dark:bg-green-600 dark:text-white dark:focus:ring-green-700 dark:enabled:hover:border-green-700 dark:enabled:hover:bg-green-700",
            "indigo": "border border-indigo-300 bg-white text-indigo-900 focus:ring-4 focus:ring-indigo-300 enabled:hover:bg-indigo-100 dark:border-indigo-600 dark:bg-indigo-600 dark:text-white dark:focus:ring-indigo-700 dark:enabled:hover:border-indigo-700 dark:enabled:hover:bg-indigo-700",
            "lime": "border border-lime-300 bg-white text-lime-900 focus:ring-4 focus:ring-lime-300 enabled:hover:bg-lime-100 dark:border-lime-600 dark:bg-lime-600 dark:text-white dark:focus:ring-lime-700 dark:enabled:hover:border-lime-700 dark:enabled:hover:bg-lime-700",
            "pink": "border border-pink-300 bg-white text-pink-900 focus:ring-4 focus:ring-pink-300 enabled:hover:bg-pink-100 dark:border-pink-600 dark:bg-pink-600 dark:text-white dark:focus:ring-pink-700 dark:enabled:hover:border-pink-700 dark:enabled:hover:bg-pink-700",
            "red": "border border-red-300 bg-white text-red-900 focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-700 dark:border-red-600 dark:bg-red-600 dark:text-white dark:focus:ring-red-700 dark:enabled:hover:border-red-700 dark:enabled:hover:bg-red-800",
            "teal": "border border-teal-300 bg-white text-teal-900 focus:ring-4 focus:ring-teal-300 enabled:hover:bg-teal-100 dark:border-teal-600 dark:bg-teal-600 dark:text-white dark:focus:ring-teal-700 dark:enabled:hover:border-teal-700 dark:enabled:hover:bg-teal-700",
            "yellow": "border border-yellow-300 bg-white text-yellow-900 focus:ring-4 focus:ring-yellow-300 enabled:hover:bg-yellow-100 dark:border-yellow-600 dark:bg-yellow-600 dark:text-white dark:focus:ring-yellow-700 dark:enabled:hover:border-yellow-700 dark:enabled:hover:bg-yellow-700"
        },
        "disabled": "cursor-not-allowed opacity-50",
        "isProcessing": "cursor-wait",
        "spinnerSlot": "absolute top-0 flex h-full items-center",
        "spinnerLeftPosition": {
            "xs": "left-2",
            "sm": "left-3",
            "md": "left-4",
            "lg": "left-5",
            "xl": "left-6"
        },
        "gradient": {
            "cyan": "bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-br dark:focus:ring-cyan-800",
            "failure": "bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-gradient-to-br dark:focus:ring-red-800",
            "info": "bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-br dark:focus:ring-cyan-800 ",
            "lime": "bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 text-gray-900 focus:ring-4 focus:ring-lime-300 enabled:hover:bg-gradient-to-br dark:focus:ring-lime-800",
            "pink": "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white focus:ring-4 focus:ring-pink-300 enabled:hover:bg-gradient-to-br dark:focus:ring-pink-800",
            "purple": "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white focus:ring-4 focus:ring-purple-300 enabled:hover:bg-gradient-to-br dark:focus:ring-purple-800",
            "success": "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white focus:ring-4 focus:ring-green-300 enabled:hover:bg-gradient-to-br dark:focus:ring-green-800",
            "teal": "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white focus:ring-4 focus:ring-teal-300 enabled:hover:bg-gradient-to-br dark:focus:ring-teal-800"
        },
        "gradientDuoTone": {
            "cyanToBlue": "bg-gradient-to-r from-cyan-500 to-cyan-500 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-bl dark:focus:ring-cyan-800",
            "greenToBlue": "bg-gradient-to-br from-green-400 to-cyan-600 text-white focus:ring-4 focus:ring-green-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-green-800",
            "pinkToOrange": "bg-gradient-to-br from-pink-500 to-orange-400 text-white focus:ring-4 focus:ring-pink-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-pink-800",
            "purpleToBlue": "bg-gradient-to-br from-purple-600 to-cyan-500 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-bl dark:focus:ring-cyan-800",
            "purpleToPink": "bg-gradient-to-r from-purple-500 to-pink-500 text-white focus:ring-4 focus:ring-purple-200 enabled:hover:bg-gradient-to-l dark:focus:ring-purple-800",
            "redToYellow": "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 focus:ring-4 focus:ring-red-100 enabled:hover:bg-gradient-to-bl dark:focus:ring-red-400",
            "tealToLime": "bg-gradient-to-r from-teal-200 to-lime-200 text-gray-900 focus:ring-4 focus:ring-lime-200 enabled:hover:bg-gradient-to-l enabled:hover:from-teal-200 enabled:hover:to-lime-200 enabled:hover:text-gray-900 dark:focus:ring-teal-700"
        },
        "inner": {
            "base": "flex items-stretch transition-all duration-200",
            "position": {
                "none": "",
                "start": "rounded-r-none",
                "middle": "rounded-none",
                "end": "rounded-l-none"
            },
            "outline": "border border-transparent",
            "isProcessingPadding": {
                "xs": "pl-8",
                "sm": "pl-10",
                "md": "pl-12",
                "lg": "pl-16",
                "xl": "pl-20"
            }
        },
        "label": "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
        "outline": {
            "color": {
                "gray": "border border-gray-900 dark:border-white",
                "default": "border-0",
                "light": ""
            },
            "off": "",
            "on": "flex w-full justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white",
            "pill": {
                "off": "rounded-md",
                "on": "rounded-full"
            }
        },
        "pill": {
            "off": "rounded-lg",
            "on": "rounded-full"
        },
        "size": {
            "xs": "px-2 py-1 text-xs",
            "sm": "px-3 py-1.5 text-sm",
            "md": "px-4 py-2 text-sm",
            "lg": "px-5 py-2.5 text-base",
            "xl": "px-6 py-3 text-base"
        },

        // base: '',
        // "label": "ml-2 inline-flex h-4 w-4 items-center text-center justify-content-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
    },
    navbar: {
        "root": {
            "base": "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
            "rounded": {
                "on": "rounded",
                "off": ""
            },
            "bordered": {
                "on": "border",
                "off": ""
            },
            "inner": {
                "base": "mx-auto flex flex-wrap items-center justify-between",
                "fluid": {
                    "on": "",
                    "off": "container"
                }
            }
        },
        "brand": {
            "base": "flex items-center"
        },
        "collapse": {
            "base": "w-full md:block md:w-auto",
            "list": "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
            "hidden": {
                "on": "hidden",
                "off": ""
            }
        },
        "link": {
            "base": "block py-2 pl-3 pr-4 md:p-0 text-center",
            "active": {
                "on": "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
                "off": "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            },
            "disabled": {
                "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
                "off": ""
            }
        },
        "toggle": {
            "base": "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
            "icon": "h-6 w-6 shrink-0"
        }
    },
    footer: {
        "root": {
            "base": "w-full rounded-lg bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between",
            "container": "w-full p-6",
            "bgDark": "bg-gray-800"
        },
        "groupLink": {
            "base": "flex flex-wrap text-m text-gray-500 dark:text-white",
            "link": {
                "base": "me-4 last:mr-0 md:mr-6",
                "href": "hover:underline"
            },
            "col": "flex-col space-y-4"
        },
        "icon": {
            "base": "text-gray-500 dark:hover:text-white",
            "size": "h-5 w-5"
        },
        "title": {
            "base": "mb-6 text-m font-semibold uppercase text-gray-500 dark:text-white"
        },
        "divider": {
            "base": "my-6 w-full border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8"
        },
        "copyright": {
            "base": "text-sm text-gray-500 dark:text-gray-400 sm:text-center",
            "href": "ml-1 hover:underline",
            "span": "ml-1"
        },
        "brand": {
            "base": "mb-4 flex items-center sm:mb-0",
            "img": "mr-3 h-[80px]",
            "span": "self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white"
        }
    },
    listGroup: {
        "root": {
            "base": "list-none rounded border border-gray-800 bg-white text-left text-sm font-medium text-gray-900 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
        },
        "item": {
            "base": "",
            "link": {
                "base": "flex w-full items-center border-b border-gray-200 px-4 py-2 dark:border-gray-600",
                "active": {
                    "off": "hover:bg-gray-100 hover:text-cyan-700 focus:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500",
                    "on": "bg-cyan-700 text-white dark:bg-gray-800"
                },
                "disabled": {
                    "off": "",
                    "on": "cursor-not-allowed bg-gray-100 text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:text-gray-900"
                },
                "href": {
                    "off": "",
                    "on": ""
                },
                "icon": "mr-2 h-4 w-4 fill-current"
            }
        }
    },
    carousel: {
        "root": {
            "base": "relative h-full w-full",
            "leftControl": "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
            "rightControl": "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none"
        },
        "indicators": {
            "active": {
                "off": "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
                "on": "bg-white dark:bg-gray-50"
            },
            "base": "h-3 w-3 rounded-full",
            "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
        },
        "item": {
            "base": "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
            "wrapper": {
                "off": "w-full flex-shrink-0 transform cursor-default snap-center",
                "on": "w-full flex-shrink-0 transform cursor-grab snap-center"
            }
        },
        "control": {
            "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-500 dark:group-hover:bg-gray-400 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
            "icon": "h-5 w-5 text-white dark:text-white sm:h-6 sm:w-6"
        },
        "scrollContainer": {
            "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
            "snap": "snap-x"
        }
    },
    textarea: {
        "base": "block w-full rounded-lg border text-sm disabled:cursor-not-allowed disabled:opacity-50",
        "colors": {
            "gray": "border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
            "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
            "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
            "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
            "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
        },
        "withShadow": {
            "on": "shadow-sm dark:shadow-sm-light",
            "off": ""
        }
    },
    textInput: {
        "base": "flex",
        "addon": "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
        "field": {
            "base": "relative w-full",
            "icon": {
                "base": "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
                "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
            },
            "rightIcon": {
                "base": "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
                "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
            },
            "input": {
                "base": "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                "sizes": {
                    "sm": "p-2 sm:text-xs",
                    "md": "p-2.5 text-sm",
                    "lg": "p-4 sm:text-base"
                },
                "colors": {
                    "gray": "border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                    "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                    "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                    "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                    "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
                },
                "withRightIcon": {
                    "on": "pr-10",
                    "off": ""
                },
                "withIcon": {
                    "on": "pl-10",
                    "off": ""
                },
                "withAddon": {
                    "on": "rounded-r-lg",
                    "off": "rounded-lg"
                },
                "withShadow": {
                    "on": "shadow-sm dark:shadow-sm-light",
                    "off": ""
                }
            }
        }
    },
    label: {
        "root": {
            "base": "text-sm font-medium",
            "disabled": "opacity-50",
            "colors": {
                "default": "text-gray-900 dark:text-white",
                "info": "text-cyan-500 dark:text-cyan-600",
                "failure": "text-red-700 dark:text-red-500",
                "warning": "text-yellow-500 dark:text-yellow-600",
                "success": "text-green-700 dark:text-green-500"
            }
        }
    },
    fileInput: {
        "root": {
            "base": "flex"
        },
        "field": {
            "base": "relative w-full",
            "input": {
                "base": "block w-full overflow-hidden rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
                "sizes": {
                    "sm": "sm:text-xs",
                    "md": "text-sm",
                    "lg": "sm:text-base"
                },
                "colors": {
                    "gray": "border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                    "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                    "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                    "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                    "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
                }
            }
        }
    },
    timeline: {
        "root": {
            "direction": {
                "horizontal": "sm:flex",
                "vertical": "relative border-l border-gray-200 dark:border-gray-700"
            }
        },
        "item": {
            "root": {
                "horizontal": "relative mb-6 sm:mb-0",
                "vertical": "mb-10 ml-6"
            },
            "content": {
                "root": {
                    "base": "mt-3 sm:pr-8"
                },
                "body": {
                    "base": "mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
                },
                "time": {
                    "base": "mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                },
                "title": {
                    "base": "text-lg font-semibold text-gray-900 dark:text-white"
                }
            },
            "point": {
                "horizontal": "flex items-center",
                "line": "hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex",
                "marker": {
                    "base": {
                        "horizontal": "absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700",
                        "vertical": "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
                    },
                    "icon": {
                        "base": "h-3 w-3 text-cyan-600 dark:text-cyan-300",
                        "wrapper": "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-200 ring-8 ring-white dark:bg-cyan-900 dark:ring-gray-900"
                    }
                },
                "vertical": ""
            }
        }
    },
    card: {
        "root": {
            "base": "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
            "children": "flex h-full flex-col justify-center gap-4 p-6 w-full",
            "horizontal": {
                "off": "flex-col",
                "on": "flex-col md:flex-row"
            },
            "href": "hover:bg-gray-100 dark:hover:bg-gray-700"
        },
        "img": {
            "base": "",
            "horizontal": {
                "off": "rounded-t-lg",
                "on": "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg lg:w-80"
            }
        }
    },
    badge:{
        "root": {
            "base": "flex h-fit items-center gap-1 font-semibold",
            "color": {
                "info": "bg-cyan-100 text-cyan-800 group-hover:bg-cyan-200 dark:bg-cyan-200 dark:text-cyan-800 dark:group-hover:bg-cyan-300",
                "gray": "bg-gray-100 text-gray-800 group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:group-hover:bg-gray-600",
                "failure": "bg-red-100 text-red-800 group-hover:bg-red-200 dark:bg-red-200 dark:text-red-900 dark:group-hover:bg-red-300",
                "success": "bg-green-100 text-green-800 group-hover:bg-green-200 dark:bg-green-200 dark:text-green-900 dark:group-hover:bg-green-300",
                "warning": "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 dark:bg-yellow-200 dark:text-yellow-900 dark:group-hover:bg-yellow-300",
                "indigo": "bg-indigo-100 text-indigo-800 group-hover:bg-indigo-200 dark:bg-indigo-200 dark:text-indigo-900 dark:group-hover:bg-indigo-300",
                "purple": "bg-purple-100 text-purple-800 group-hover:bg-purple-200 dark:bg-purple-200 dark:text-purple-900 dark:group-hover:bg-purple-300",
                "pink": "bg-pink-100 text-pink-800 group-hover:bg-pink-200 dark:bg-pink-200 dark:text-pink-900 dark:group-hover:bg-pink-300",
                "blue": "bg-blue-100 text-blue-800 group-hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-900 dark:group-hover:bg-blue-300",
                "cyan": "bg-cyan-100 text-cyan-800 group-hover:bg-cyan-200 dark:bg-cyan-200 dark:text-cyan-900 dark:group-hover:bg-cyan-300",
                "dark": "bg-gray-600 text-gray-100 group-hover:bg-gray-500 dark:bg-gray-900 dark:text-gray-200 dark:group-hover:bg-gray-700",
                "light": "bg-gray-200 text-gray-800 group-hover:bg-gray-300 dark:bg-gray-400 dark:text-gray-900 dark:group-hover:bg-gray-500",
                "green": "bg-green-100 text-green-800 group-hover:bg-green-200 dark:bg-green-200 dark:text-green-900 dark:group-hover:bg-green-300",
                "lime": "bg-lime-100 text-lime-800 group-hover:bg-lime-200 dark:bg-lime-200 dark:text-lime-900 dark:group-hover:bg-lime-300",
                "red": "bg-red-100 text-red-800 group-hover:bg-red-200 dark:bg-red-200 dark:text-red-900 dark:group-hover:bg-red-300",
                "teal": "bg-teal-100 text-teal-800 group-hover:bg-teal-200 dark:bg-teal-200 dark:text-teal-900 dark:group-hover:bg-teal-300",
                "yellow": "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 dark:bg-yellow-200 dark:text-yellow-900 dark:group-hover:bg-yellow-300"
            },
            "href": "group",
            "size": {
                "xs": "p-1 text-xs",
                "sm": "p-1.5 text-sm",
                "md": "p-2 text-md",
                "lg": "p-2.5 text-xl",
                "xl": "p-3 text-2xl",
                "2xl": "p-4 text-3xl"
            }
        },
        "icon": {
            "off": "rounded px-2 py-0.5",
            "on": "rounded-full p-1.5",
            "size": {
                "xs": "h-3 w-3",
                "sm": "h-3.5 w-3.5",
                "md": "h-4 w-4",
                "lg": "h-10 w-10",
                "xl": "h-12 w-12",
                "2xl": "h-16 w-16"
            },
        },
    },
    toast: {
        "root": {
            "base": "flex w-full max-w-xs items-center rounded-lg bg-white p-4 shadow dark:bg-white",
            "closed": "opacity-0 ease-out"
        },
        "toggle": {
            "base": "-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-800 hover:bg-gray-50 hover:text-gray-500 focus:ring-2 focus:ring-gray-300 dark:text-gray-800 dark:hover:bg-gray-300 dark:hover:text-black",
            "icon": "h-5 w-5 shrink-0"
        }
    }
}