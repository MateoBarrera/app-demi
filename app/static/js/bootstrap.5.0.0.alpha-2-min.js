/*!
 * Bootstrap v5.0.0-alpha2 (https://getbootstrap.com/)
 * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
!(function (t, e) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = e(require("popper.js")))
		: "function" == typeof define && define.amd
		? define(["popper.js"], e)
		: ((t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e(t.Popper))
})(this, function (t) {
	"use strict"
	function e(t) {
		return t && "object" == typeof t && "default" in t ? t : { default: t }
	}
	var n = e(t)
	function i(t, e) {
		for (var n = 0; n < e.length; n++) {
			var i = e[n]
			;(i.enumerable = i.enumerable || !1),
				(i.configurable = !0),
				"value" in i && (i.writable = !0),
				Object.defineProperty(t, i.key, i)
		}
	}
	function o(t, e, n) {
		return e && i(t.prototype, e), n && i(t, n), t
	}
	function s() {
		return (s =
			Object.assign ||
			function (t) {
				for (var e = 1; e < arguments.length; e++) {
					var n = arguments[e]
					for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
				}
				return t
			}).apply(this, arguments)
	}
	var r,
		a,
		l,
		c,
		u = function (t) {
			do {
				t += Math.floor(1e6 * Math.random())
			} while (document.getElementById(t))
			return t
		},
		h = function (t) {
			var e = t.getAttribute("data-target")
			if (!e || "#" === e) {
				var n = t.getAttribute("href")
				e = n && "#" !== n ? n.trim() : null
			}
			return e
		},
		f = function (t) {
			var e = h(t)
			return e && document.querySelector(e) ? e : null
		},
		d = function (t) {
			var e = h(t)
			return e ? document.querySelector(e) : null
		},
		g = function (t) {
			if (!t) return 0
			var e = window.getComputedStyle(t),
				n = e.transitionDuration,
				i = e.transitionDelay,
				o = parseFloat(n),
				s = parseFloat(i)
			return o || s
				? ((n = n.split(",")[0]), (i = i.split(",")[0]), 1e3 * (parseFloat(n) + parseFloat(i)))
				: 0
		},
		p = function (t) {
			t.dispatchEvent(new Event("transitionend"))
		},
		m = function (t) {
			return (t[0] || t).nodeType
		},
		_ = function (t, e) {
			var n = !1,
				i = e + 5
			t.addEventListener("transitionend", function e() {
				;(n = !0), t.removeEventListener("transitionend", e)
			}),
				setTimeout(function () {
					n || p(t)
				}, i)
		},
		v = function (t, e, n) {
			Object.keys(n).forEach(function (i) {
				var o,
					s = n[i],
					r = e[i],
					a =
						r && m(r)
							? "element"
							: null == (o = r)
							? "" + o
							: {}.toString
									.call(o)
									.match(/\s([a-z]+)/i)[1]
									.toLowerCase()
				if (!new RegExp(s).test(a))
					throw new Error(
						t.toUpperCase() +
							': Option "' +
							i +
							'" provided type "' +
							a +
							'" but expected type "' +
							s +
							'".'
					)
			})
		},
		b = function (t) {
			if (!t) return !1
			if (t.style && t.parentNode && t.parentNode.style) {
				var e = getComputedStyle(t),
					n = getComputedStyle(t.parentNode)
				return "none" !== e.display && "none" !== n.display && "hidden" !== e.visibility
			}
			return !1
		},
		y = function () {
			return function () {}
		},
		w = function (t) {
			return t.offsetHeight
		},
		E = function () {
			var t = window.jQuery
			return t && !document.body.hasAttribute("data-no-jquery") ? t : null
		},
		T =
			((r = {}),
			(a = 1),
			{
				set: function (t, e, n) {
					void 0 === t.bsKey && ((t.bsKey = { key: e, id: a }), a++), (r[t.bsKey.id] = n)
				},
				get: function (t, e) {
					if (!t || void 0 === t.bsKey) return null
					var n = t.bsKey
					return n.key === e ? r[n.id] : null
				},
				delete: function (t, e) {
					if (void 0 !== t.bsKey) {
						var n = t.bsKey
						n.key === e && (delete r[n.id], delete t.bsKey)
					}
				},
			}),
		k = function (t, e, n) {
			T.set(t, e, n)
		},
		L = function (t, e) {
			return T.get(t, e)
		},
		C = function (t, e) {
			T.delete(t, e)
		},
		A = Element.prototype.querySelectorAll,
		S = Element.prototype.querySelector,
		D =
			((l = new CustomEvent("Bootstrap", { cancelable: !0 })),
			(c = document.createElement("div")).addEventListener("Bootstrap", function () {
				return null
			}),
			l.preventDefault(),
			c.dispatchEvent(l),
			l.defaultPrevented),
		I = /:scope\b/
	;(function () {
		var t = document.createElement("div")
		try {
			t.querySelectorAll(":scope *")
		} catch (t) {
			return !1
		}
		return !0
	})() ||
		((A = function (t) {
			if (!I.test(t)) return this.querySelectorAll(t)
			var e = Boolean(this.id)
			e || (this.id = u("scope"))
			var n = null
			try {
				;(t = t.replace(I, "#" + this.id)), (n = this.querySelectorAll(t))
			} finally {
				e || this.removeAttribute("id")
			}
			return n
		}),
		(S = function (t) {
			if (!I.test(t)) return this.querySelector(t)
			var e = A.call(this, t)
			return void 0 !== e[0] ? e[0] : null
		}))
	var O = E(),
		N = /[^.]*(?=\..*)\.|.*/,
		j = /\..*/,
		x = /::\d+$/,
		P = {},
		R = 1,
		H = { mouseenter: "mouseover", mouseleave: "mouseout" },
		B = [
			"click",
			"dblclick",
			"mouseup",
			"mousedown",
			"contextmenu",
			"mousewheel",
			"DOMMouseScroll",
			"mouseover",
			"mouseout",
			"mousemove",
			"selectstart",
			"selectend",
			"keydown",
			"keypress",
			"keyup",
			"orientationchange",
			"touchstart",
			"touchmove",
			"touchend",
			"touchcancel",
			"pointerdown",
			"pointermove",
			"pointerup",
			"pointerleave",
			"pointercancel",
			"gesturestart",
			"gesturechange",
			"gestureend",
			"focus",
			"blur",
			"change",
			"reset",
			"select",
			"submit",
			"focusin",
			"focusout",
			"load",
			"unload",
			"beforeunload",
			"resize",
			"move",
			"DOMContentLoaded",
			"readystatechange",
			"error",
			"abort",
			"scroll",
		]
	function M(t, e) {
		return (e && e + "::" + R++) || t.uidEvent || R++
	}
	function Q(t) {
		var e = M(t)
		return (t.uidEvent = e), (P[e] = P[e] || {}), P[e]
	}
	function U(t, e, n) {
		void 0 === n && (n = null)
		for (var i = Object.keys(t), o = 0, s = i.length; o < s; o++) {
			var r = t[i[o]]
			if (r.originalHandler === e && r.delegationSelector === n) return r
		}
		return null
	}
	function F(t, e, n) {
		var i = "string" == typeof e,
			o = i ? n : e,
			s = t.replace(j, ""),
			r = H[s]
		return r && (s = r), B.indexOf(s) > -1 || (s = t), [i, o, s]
	}
	function W(t, e, n, i, o) {
		if ("string" == typeof e && t) {
			n || ((n = i), (i = null))
			var s = F(e, n, i),
				r = s[0],
				a = s[1],
				l = s[2],
				c = Q(t),
				u = c[l] || (c[l] = {}),
				h = U(u, a, r ? n : null)
			if (h) h.oneOff = h.oneOff && o
			else {
				var f = M(a, e.replace(N, "")),
					d = r
						? (function (t, e, n) {
								return function i(o) {
									for (
										var s = t.querySelectorAll(e), r = o.target;
										r && r !== this;
										r = r.parentNode
									)
										for (var a = s.length; a--; )
											if (s[a] === r)
												return (
													(o.delegateTarget = r), i.oneOff && V.off(t, o.type, n), n.apply(r, [o])
												)
									return null
								}
						  })(t, n, i)
						: (function (t, e) {
								return function n(i) {
									return (i.delegateTarget = t), n.oneOff && V.off(t, i.type, e), e.apply(t, [i])
								}
						  })(t, n)
				;(d.delegationSelector = r ? n : null),
					(d.originalHandler = a),
					(d.oneOff = o),
					(d.uidEvent = f),
					(u[f] = d),
					t.addEventListener(l, d, r)
			}
		}
	}
	function K(t, e, n, i, o) {
		var s = U(e[n], i, o)
		s && (t.removeEventListener(n, s, Boolean(o)), delete e[n][s.uidEvent])
	}
	var V = {
			on: function (t, e, n, i) {
				W(t, e, n, i, !1)
			},
			one: function (t, e, n, i) {
				W(t, e, n, i, !0)
			},
			off: function (t, e, n, i) {
				if ("string" == typeof e && t) {
					var o = F(e, n, i),
						s = o[0],
						r = o[1],
						a = o[2],
						l = a !== e,
						c = Q(t),
						u = "." === e.charAt(0)
					if (void 0 === r) {
						u &&
							Object.keys(c).forEach(function (n) {
								!(function (t, e, n, i) {
									var o = e[n] || {}
									Object.keys(o).forEach(function (s) {
										if (s.indexOf(i) > -1) {
											var r = o[s]
											K(t, e, n, r.originalHandler, r.delegationSelector)
										}
									})
								})(t, c, n, e.slice(1))
							})
						var h = c[a] || {}
						Object.keys(h).forEach(function (n) {
							var i = n.replace(x, "")
							if (!l || e.indexOf(i) > -1) {
								var o = h[n]
								K(t, c, a, o.originalHandler, o.delegationSelector)
							}
						})
					} else {
						if (!c || !c[a]) return
						K(t, c, a, r, s ? n : null)
					}
				}
			},
			trigger: function (t, e, n) {
				if ("string" != typeof e || !t) return null
				var i,
					o = e.replace(j, ""),
					s = e !== o,
					r = B.indexOf(o) > -1,
					a = !0,
					l = !0,
					c = !1,
					u = null
				return (
					s &&
						O &&
						((i = O.Event(e, n)),
						O(t).trigger(i),
						(a = !i.isPropagationStopped()),
						(l = !i.isImmediatePropagationStopped()),
						(c = i.isDefaultPrevented())),
					r
						? (u = document.createEvent("HTMLEvents")).initEvent(o, a, !0)
						: (u = new CustomEvent(e, { bubbles: a, cancelable: !0 })),
					void 0 !== n &&
						Object.keys(n).forEach(function (t) {
							Object.defineProperty(u, t, {
								get: function () {
									return n[t]
								},
							})
						}),
					c &&
						(u.preventDefault(),
						D ||
							Object.defineProperty(u, "defaultPrevented", {
								get: function () {
									return !0
								},
							})),
					l && t.dispatchEvent(u),
					u.defaultPrevented && void 0 !== i && i.preventDefault(),
					u
				)
			},
		},
		q = "alert",
		z = (function () {
			function t(t) {
				;(this._element = t), this._element && k(t, "bs.alert", this)
			}
			var e = t.prototype
			return (
				(e.close = function (t) {
					var e = t ? this._getRootElement(t) : this._element,
						n = this._triggerCloseEvent(e)
					null === n || n.defaultPrevented || this._removeElement(e)
				}),
				(e.dispose = function () {
					C(this._element, "bs.alert"), (this._element = null)
				}),
				(e._getRootElement = function (t) {
					return d(t) || t.closest(".alert")
				}),
				(e._triggerCloseEvent = function (t) {
					return V.trigger(t, "close.bs.alert")
				}),
				(e._removeElement = function (t) {
					var e = this
					if ((t.classList.remove("show"), t.classList.contains("fade"))) {
						var n = g(t)
						V.one(t, "transitionend", function () {
							return e._destroyElement(t)
						}),
							_(t, n)
					} else this._destroyElement(t)
				}),
				(e._destroyElement = function (t) {
					t.parentNode && t.parentNode.removeChild(t), V.trigger(t, "closed.bs.alert")
				}),
				(t.jQueryInterface = function (e) {
					return this.each(function () {
						var n = L(this, "bs.alert")
						n || (n = new t(this)), "close" === e && n[e](this)
					})
				}),
				(t.handleDismiss = function (t) {
					return function (e) {
						e && e.preventDefault(), t.close(this)
					}
				}),
				(t.getInstance = function (t) {
					return L(t, "bs.alert")
				}),
				o(t, null, [
					{
						key: "VERSION",
						get: function () {
							return "5.0.0-alpha2"
						},
					},
				]),
				t
			)
		})()
	V.on(document, "click.bs.alert.data-api", '[data-dismiss="alert"]', z.handleDismiss(new z()))
	var X = E()
	if (X) {
		var Y = X.fn[q]
		;(X.fn[q] = z.jQueryInterface),
			(X.fn[q].Constructor = z),
			(X.fn[q].noConflict = function () {
				return (X.fn[q] = Y), z.jQueryInterface
			})
	}
	var $ = (function () {
		function t(t) {
			;(this._element = t), k(t, "bs.button", this)
		}
		var e = t.prototype
		return (
			(e.toggle = function () {
				this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
			}),
			(e.dispose = function () {
				C(this._element, "bs.button"), (this._element = null)
			}),
			(t.jQueryInterface = function (e) {
				return this.each(function () {
					var n = L(this, "bs.button")
					n || (n = new t(this)), "toggle" === e && n[e]()
				})
			}),
			(t.getInstance = function (t) {
				return L(t, "bs.button")
			}),
			o(t, null, [
				{
					key: "VERSION",
					get: function () {
						return "5.0.0-alpha2"
					},
				},
			]),
			t
		)
	})()
	V.on(document, "click.bs.button.data-api", '[data-toggle="button"]', function (t) {
		t.preventDefault()
		var e = t.target.closest('[data-toggle="button"]'),
			n = L(e, "bs.button")
		n || (n = new $(e)), n.toggle()
	})
	var G = E()
	if (G) {
		var Z = G.fn.button
		;(G.fn.button = $.jQueryInterface),
			(G.fn.button.Constructor = $),
			(G.fn.button.noConflict = function () {
				return (G.fn.button = Z), $.jQueryInterface
			})
	}
	function J(t) {
		return (
			"true" === t ||
			("false" !== t &&
				(t === Number(t).toString() ? Number(t) : "" === t || "null" === t ? null : t))
		)
	}
	function tt(t) {
		return t.replace(/[A-Z]/g, function (t) {
			return "-" + t.toLowerCase()
		})
	}
	var et = {
			setDataAttribute: function (t, e, n) {
				t.setAttribute("data-" + tt(e), n)
			},
			removeDataAttribute: function (t, e) {
				t.removeAttribute("data-" + tt(e))
			},
			getDataAttributes: function (t) {
				if (!t) return {}
				var e = s({}, t.dataset)
				return (
					Object.keys(e).forEach(function (t) {
						e[t] = J(e[t])
					}),
					e
				)
			},
			getDataAttribute: function (t, e) {
				return J(t.getAttribute("data-" + tt(e)))
			},
			offset: function (t) {
				var e = t.getBoundingClientRect()
				return { top: e.top + document.body.scrollTop, left: e.left + document.body.scrollLeft }
			},
			position: function (t) {
				return { top: t.offsetTop, left: t.offsetLeft }
			},
			toggleClass: function (t, e) {
				t && (t.classList.contains(e) ? t.classList.remove(e) : t.classList.add(e))
			},
		},
		nt = {
			matches: function (t, e) {
				return t.matches(e)
			},
			find: function (t, e) {
				var n
				return (
					void 0 === e && (e = document.documentElement), (n = []).concat.apply(n, A.call(e, t))
				)
			},
			findOne: function (t, e) {
				return void 0 === e && (e = document.documentElement), S.call(e, t)
			},
			children: function (t, e) {
				var n,
					i = (n = []).concat.apply(n, t.children)
				return i.filter(function (t) {
					return t.matches(e)
				})
			},
			parents: function (t, e) {
				for (
					var n = [], i = t.parentNode;
					i && i.nodeType === Node.ELEMENT_NODE && 3 !== i.nodeType;

				)
					this.matches(i, e) && n.push(i), (i = i.parentNode)
				return n
			},
			prev: function (t, e) {
				for (var n = t.previousElementSibling; n; ) {
					if (n.matches(e)) return [n]
					n = n.previousElementSibling
				}
				return []
			},
			next: function (t, e) {
				for (var n = t.nextElementSibling; n; ) {
					if (this.matches(n, e)) return [n]
					n = n.nextElementSibling
				}
				return []
			},
		},
		it = "carousel",
		ot = ".bs.carousel",
		st = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0 },
		rt = {
			interval: "(number|boolean)",
			keyboard: "boolean",
			slide: "(boolean|string)",
			pause: "(string|boolean)",
			wrap: "boolean",
			touch: "boolean",
		},
		at = { TOUCH: "touch", PEN: "pen" },
		lt = (function () {
			function t(t, e) {
				;(this._items = null),
					(this._interval = null),
					(this._activeElement = null),
					(this._isPaused = !1),
					(this._isSliding = !1),
					(this.touchTimeout = null),
					(this.touchStartX = 0),
					(this.touchDeltaX = 0),
					(this._config = this._getConfig(e)),
					(this._element = t),
					(this._indicatorsElement = nt.findOne(".carousel-indicators", this._element)),
					(this._touchSupported =
						"ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0),
					(this._pointerEvent = Boolean(window.PointerEvent)),
					this._addEventListeners(),
					k(t, "bs.carousel", this)
			}
			var e = t.prototype
			return (
				(e.next = function () {
					this._isSliding || this._slide("next")
				}),
				(e.nextWhenVisible = function () {
					!document.hidden && b(this._element) && this.next()
				}),
				(e.prev = function () {
					this._isSliding || this._slide("prev")
				}),
				(e.pause = function (t) {
					t || (this._isPaused = !0),
						nt.findOne(".carousel-item-next, .carousel-item-prev", this._element) &&
							(p(this._element), this.cycle(!0)),
						clearInterval(this._interval),
						(this._interval = null)
				}),
				(e.cycle = function (t) {
					t || (this._isPaused = !1),
						this._interval && (clearInterval(this._interval), (this._interval = null)),
						this._config &&
							this._config.interval &&
							!this._isPaused &&
							(this._interval = setInterval(
								(document.visibilityState ? this.nextWhenVisible : this.next).bind(this),
								this._config.interval
							))
				}),
				(e.to = function (t) {
					var e = this
					this._activeElement = nt.findOne(".active.carousel-item", this._element)
					var n = this._getItemIndex(this._activeElement)
					if (!(t > this._items.length - 1 || t < 0))
						if (this._isSliding)
							V.one(this._element, "slid.bs.carousel", function () {
								return e.to(t)
							})
						else {
							if (n === t) return this.pause(), void this.cycle()
							var i = t > n ? "next" : "prev"
							this._slide(i, this._items[t])
						}
				}),
				(e.dispose = function () {
					V.off(this._element, ot),
						C(this._element, "bs.carousel"),
						(this._items = null),
						(this._config = null),
						(this._element = null),
						(this._interval = null),
						(this._isPaused = null),
						(this._isSliding = null),
						(this._activeElement = null),
						(this._indicatorsElement = null)
				}),
				(e._getConfig = function (t) {
					return (t = s({}, st, t)), v(it, t, rt), t
				}),
				(e._handleSwipe = function () {
					var t = Math.abs(this.touchDeltaX)
					if (!(t <= 40)) {
						var e = t / this.touchDeltaX
						;(this.touchDeltaX = 0), e > 0 && this.prev(), e < 0 && this.next()
					}
				}),
				(e._addEventListeners = function () {
					var t = this
					this._config.keyboard &&
						V.on(this._element, "keydown.bs.carousel", function (e) {
							return t._keydown(e)
						}),
						"hover" === this._config.pause &&
							(V.on(this._element, "mouseenter.bs.carousel", function (e) {
								return t.pause(e)
							}),
							V.on(this._element, "mouseleave.bs.carousel", function (e) {
								return t.cycle(e)
							})),
						this._config.touch && this._touchSupported && this._addTouchEventListeners()
				}),
				(e._addTouchEventListeners = function () {
					var t = this,
						e = function (e) {
							t._pointerEvent && at[e.pointerType.toUpperCase()]
								? (t.touchStartX = e.clientX)
								: t._pointerEvent || (t.touchStartX = e.touches[0].clientX)
						},
						n = function (e) {
							t._pointerEvent &&
								at[e.pointerType.toUpperCase()] &&
								(t.touchDeltaX = e.clientX - t.touchStartX),
								t._handleSwipe(),
								"hover" === t._config.pause &&
									(t.pause(),
									t.touchTimeout && clearTimeout(t.touchTimeout),
									(t.touchTimeout = setTimeout(function (e) {
										return t.cycle(e)
									}, 500 + t._config.interval)))
						}
					nt.find(".carousel-item img", this._element).forEach(function (t) {
						V.on(t, "dragstart.bs.carousel", function (t) {
							return t.preventDefault()
						})
					}),
						this._pointerEvent
							? (V.on(this._element, "pointerdown.bs.carousel", function (t) {
									return e(t)
							  }),
							  V.on(this._element, "pointerup.bs.carousel", function (t) {
									return n(t)
							  }),
							  this._element.classList.add("pointer-event"))
							: (V.on(this._element, "touchstart.bs.carousel", function (t) {
									return e(t)
							  }),
							  V.on(this._element, "touchmove.bs.carousel", function (e) {
									return (function (e) {
										e.touches && e.touches.length > 1
											? (t.touchDeltaX = 0)
											: (t.touchDeltaX = e.touches[0].clientX - t.touchStartX)
									})(e)
							  }),
							  V.on(this._element, "touchend.bs.carousel", function (t) {
									return n(t)
							  }))
				}),
				(e._keydown = function (t) {
					if (!/input|textarea/i.test(t.target.tagName))
						switch (t.key) {
							case "ArrowLeft":
								t.preventDefault(), this.prev()
								break
							case "ArrowRight":
								t.preventDefault(), this.next()
						}
				}),
				(e._getItemIndex = function (t) {
					return (
						(this._items = t && t.parentNode ? nt.find(".carousel-item", t.parentNode) : []),
						this._items.indexOf(t)
					)
				}),
				(e._getItemByDirection = function (t, e) {
					var n = "next" === t,
						i = "prev" === t,
						o = this._getItemIndex(e),
						s = this._items.length - 1
					if (((i && 0 === o) || (n && o === s)) && !this._config.wrap) return e
					var r = (o + ("prev" === t ? -1 : 1)) % this._items.length
					return -1 === r ? this._items[this._items.length - 1] : this._items[r]
				}),
				(e._triggerSlideEvent = function (t, e) {
					var n = this._getItemIndex(t),
						i = this._getItemIndex(nt.findOne(".active.carousel-item", this._element))
					return V.trigger(this._element, "slide.bs.carousel", {
						relatedTarget: t,
						direction: e,
						from: i,
						to: n,
					})
				}),
				(e._setActiveIndicatorElement = function (t) {
					if (this._indicatorsElement) {
						for (var e = nt.find(".active", this._indicatorsElement), n = 0; n < e.length; n++)
							e[n].classList.remove("active")
						var i = this._indicatorsElement.children[this._getItemIndex(t)]
						i && i.classList.add("active")
					}
				}),
				(e._slide = function (t, e) {
					var n,
						i,
						o,
						s = this,
						r = nt.findOne(".active.carousel-item", this._element),
						a = this._getItemIndex(r),
						l = e || (r && this._getItemByDirection(t, r)),
						c = this._getItemIndex(l),
						u = Boolean(this._interval)
					if (
						("next" === t
							? ((n = "carousel-item-left"), (i = "carousel-item-next"), (o = "left"))
							: ((n = "carousel-item-right"), (i = "carousel-item-prev"), (o = "right")),
						l && l.classList.contains("active"))
					)
						this._isSliding = !1
					else if (!this._triggerSlideEvent(l, o).defaultPrevented && r && l) {
						if (
							((this._isSliding = !0),
							u && this.pause(),
							this._setActiveIndicatorElement(l),
							this._element.classList.contains("slide"))
						) {
							l.classList.add(i), w(l), r.classList.add(n), l.classList.add(n)
							var h = parseInt(l.getAttribute("data-interval"), 10)
							h
								? ((this._config.defaultInterval =
										this._config.defaultInterval || this._config.interval),
								  (this._config.interval = h))
								: (this._config.interval = this._config.defaultInterval || this._config.interval)
							var f = g(r)
							V.one(r, "transitionend", function () {
								l.classList.remove(n, i),
									l.classList.add("active"),
									r.classList.remove("active", i, n),
									(s._isSliding = !1),
									setTimeout(function () {
										V.trigger(s._element, "slid.bs.carousel", {
											relatedTarget: l,
											direction: o,
											from: a,
											to: c,
										})
									}, 0)
							}),
								_(r, f)
						} else
							r.classList.remove("active"),
								l.classList.add("active"),
								(this._isSliding = !1),
								V.trigger(this._element, "slid.bs.carousel", {
									relatedTarget: l,
									direction: o,
									from: a,
									to: c,
								})
						u && this.cycle()
					}
				}),
				(t.carouselInterface = function (e, n) {
					var i = L(e, "bs.carousel"),
						o = s({}, st, et.getDataAttributes(e))
					"object" == typeof n && (o = s({}, o, n))
					var r = "string" == typeof n ? n : o.slide
					if ((i || (i = new t(e, o)), "number" == typeof n)) i.to(n)
					else if ("string" == typeof r) {
						if (void 0 === i[r]) throw new TypeError('No method named "' + r + '"')
						i[r]()
					} else o.interval && o.ride && (i.pause(), i.cycle())
				}),
				(t.jQueryInterface = function (e) {
					return this.each(function () {
						t.carouselInterface(this, e)
					})
				}),
				(t.dataApiClickHandler = function (e) {
					var n = d(this)
					if (n && n.classList.contains("carousel")) {
						var i = s({}, et.getDataAttributes(n), et.getDataAttributes(this)),
							o = this.getAttribute("data-slide-to")
						o && (i.interval = !1),
							t.carouselInterface(n, i),
							o && L(n, "bs.carousel").to(o),
							e.preventDefault()
					}
				}),
				(t.getInstance = function (t) {
					return L(t, "bs.carousel")
				}),
				o(t, null, [
					{
						key: "VERSION",
						get: function () {
							return "5.0.0-alpha2"
						},
					},
					{
						key: "Default",
						get: function () {
							return st
						},
					},
				]),
				t
			)
		})()
	V.on(
		document,
		"click.bs.carousel.data-api",
		"[data-slide], [data-slide-to]",
		lt.dataApiClickHandler
	),
		V.on(window, "load.bs.carousel.data-api", function () {
			for (var t = nt.find('[data-ride="carousel"]'), e = 0, n = t.length; e < n; e++)
				lt.carouselInterface(t[e], L(t[e], "bs.carousel"))
		})
	var ct = E()
	if (ct) {
		var ut = ct.fn[it]
		;(ct.fn[it] = lt.jQueryInterface),
			(ct.fn[it].Constructor = lt),
			(ct.fn[it].noConflict = function () {
				return (ct.fn[it] = ut), lt.jQueryInterface
			})
	}
	var ht = "collapse",
		ft = { toggle: !0, parent: "" },
		dt = { toggle: "boolean", parent: "(string|element)" },
		gt = (function () {
			function t(t, e) {
				;(this._isTransitioning = !1),
					(this._element = t),
					(this._config = this._getConfig(e)),
					(this._triggerArray = nt.find(
						'[data-toggle="collapse"][href="#' +
							t.id +
							'"],[data-toggle="collapse"][data-target="#' +
							t.id +
							'"]'
					))
				for (var n = nt.find('[data-toggle="collapse"]'), i = 0, o = n.length; i < o; i++) {
					var s = n[i],
						r = f(s),
						a = nt.find(r).filter(function (e) {
							return e === t
						})
					null !== r && a.length && ((this._selector = r), this._triggerArray.push(s))
				}
				;(this._parent = this._config.parent ? this._getParent() : null),
					this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray),
					this._config.toggle && this.toggle(),
					k(t, "bs.collapse", this)
			}
			var e = t.prototype
			return (
				(e.toggle = function () {
					this._element.classList.contains("show") ? this.hide() : this.show()
				}),
				(e.show = function () {
					var e = this
					if (!this._isTransitioning && !this._element.classList.contains("show")) {
						var n, i
						this._parent &&
							0 ===
								(n = nt.find(".show, .collapsing", this._parent).filter(function (t) {
									return "string" == typeof e._config.parent
										? t.getAttribute("data-parent") === e._config.parent
										: t.classList.contains("collapse")
								})).length &&
							(n = null)
						var o = nt.findOne(this._selector)
						if (n) {
							var s = n.filter(function (t) {
								return o !== t
							})
							if ((i = s[0] ? L(s[0], "bs.collapse") : null) && i._isTransitioning) return
						}
						if (!V.trigger(this._element, "show.bs.collapse").defaultPrevented) {
							n &&
								n.forEach(function (e) {
									o !== e && t.collapseInterface(e, "hide"), i || k(e, "bs.collapse", null)
								})
							var r = this._getDimension()
							this._element.classList.remove("collapse"),
								this._element.classList.add("collapsing"),
								(this._element.style[r] = 0),
								this._triggerArray.length &&
									this._triggerArray.forEach(function (t) {
										t.classList.remove("collapsed"), t.setAttribute("aria-expanded", !0)
									}),
								this.setTransitioning(!0)
							var a = "scroll" + (r[0].toUpperCase() + r.slice(1)),
								l = g(this._element)
							V.one(this._element, "transitionend", function () {
								e._element.classList.remove("collapsing"),
									e._element.classList.add("collapse", "show"),
									(e._element.style[r] = ""),
									e.setTransitioning(!1),
									V.trigger(e._element, "shown.bs.collapse")
							}),
								_(this._element, l),
								(this._element.style[r] = this._element[a] + "px")
						}
					}
				}),
				(e.hide = function () {
					var t = this
					if (
						!this._isTransitioning &&
						this._element.classList.contains("show") &&
						!V.trigger(this._element, "hide.bs.collapse").defaultPrevented
					) {
						var e = this._getDimension()
						;(this._element.style[e] = this._element.getBoundingClientRect()[e] + "px"),
							w(this._element),
							this._element.classList.add("collapsing"),
							this._element.classList.remove("collapse", "show")
						var n = this._triggerArray.length
						if (n > 0)
							for (var i = 0; i < n; i++) {
								var o = this._triggerArray[i],
									s = d(o)
								s &&
									!s.classList.contains("show") &&
									(o.classList.add("collapsed"), o.setAttribute("aria-expanded", !1))
							}
						this.setTransitioning(!0)
						this._element.style[e] = ""
						var r = g(this._element)
						V.one(this._element, "transitionend", function () {
							t.setTransitioning(!1),
								t._element.classList.remove("collapsing"),
								t._element.classList.add("collapse"),
								V.trigger(t._element, "hidden.bs.collapse")
						}),
							_(this._element, r)
					}
				}),
				(e.setTransitioning = function (t) {
					this._isTransitioning = t
				}),
				(e.dispose = function () {
					C(this._element, "bs.collapse"),
						(this._config = null),
						(this._parent = null),
						(this._element = null),
						(this._triggerArray = null),
						(this._isTransitioning = null)
				}),
				(e._getConfig = function (t) {
					return ((t = s({}, ft, t)).toggle = Boolean(t.toggle)), v(ht, t, dt), t
				}),
				(e._getDimension = function () {
					return this._element.classList.contains("width") ? "width" : "height"
				}),
				(e._getParent = function () {
					var t = this,
						e = this._config.parent
					m(e) ? (void 0 === e.jquery && void 0 === e[0]) || (e = e[0]) : (e = nt.findOne(e))
					var n = '[data-toggle="collapse"][data-parent="' + e + '"]'
					return (
						nt.find(n, e).forEach(function (e) {
							var n = d(e)
							t._addAriaAndCollapsedClass(n, [e])
						}),
						e
					)
				}),
				(e._addAriaAndCollapsedClass = function (t, e) {
					if (t && e.length) {
						var n = t.classList.contains("show")
						e.forEach(function (t) {
							n ? t.classList.remove("collapsed") : t.classList.add("collapsed"),
								t.setAttribute("aria-expanded", n)
						})
					}
				}),
				(t.collapseInterface = function (e, n) {
					var i = L(e, "bs.collapse"),
						o = s({}, ft, et.getDataAttributes(e), "object" == typeof n && n ? n : {})
					if (
						(!i && o.toggle && "string" == typeof n && /show|hide/.test(n) && (o.toggle = !1),
						i || (i = new t(e, o)),
						"string" == typeof n)
					) {
						if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"')
						i[n]()
					}
				}),
				(t.jQueryInterface = function (e) {
					return this.each(function () {
						t.collapseInterface(this, e)
					})
				}),
				(t.getInstance = function (t) {
					return L(t, "bs.collapse")
				}),
				o(t, null, [
					{
						key: "VERSION",
						get: function () {
							return "5.0.0-alpha2"
						},
					},
					{
						key: "Default",
						get: function () {
							return ft
						},
					},
				]),
				t
			)
		})()
	V.on(document, "click.bs.collapse.data-api", '[data-toggle="collapse"]', function (t) {
		"A" === t.target.tagName && t.preventDefault()
		var e = et.getDataAttributes(this),
			n = f(this)
		nt.find(n).forEach(function (t) {
			var n,
				i = L(t, "bs.collapse")
			i
				? (null === i._parent &&
						"string" == typeof e.parent &&
						((i._config.parent = e.parent), (i._parent = i._getParent())),
				  (n = "toggle"))
				: (n = e),
				gt.collapseInterface(t, n)
		})
	})
	var pt = E()
	if (pt) {
		var mt = pt.fn[ht]
		;(pt.fn[ht] = gt.jQueryInterface),
			(pt.fn[ht].Constructor = gt),
			(pt.fn[ht].noConflict = function () {
				return (pt.fn[ht] = mt), gt.jQueryInterface
			})
	}
	var _t = "dropdown",
		vt = new RegExp("ArrowUp|ArrowDown|Escape"),
		bt = {
			offset: 0,
			flip: !0,
			boundary: "scrollParent",
			reference: "toggle",
			display: "dynamic",
			popperConfig: null,
		},
		yt = {
			offset: "(number|string|function)",
			flip: "boolean",
			boundary: "(string|element)",
			reference: "(string|element)",
			display: "string",
			popperConfig: "(null|object)",
		},
		wt = (function () {
			function t(t, e) {
				;(this._element = t),
					(this._popper = null),
					(this._config = this._getConfig(e)),
					(this._menu = this._getMenuElement()),
					(this._inNavbar = this._detectNavbar()),
					this._addEventListeners(),
					k(t, "bs.dropdown", this)
			}
			var e = t.prototype
			return (
				(e.toggle = function () {
					if (!this._element.disabled && !this._element.classList.contains("disabled")) {
						var e = this._element.classList.contains("show")
						t.clearMenus(), e || this.show()
					}
				}),
				(e.show = function () {
					if (
						!(
							this._element.disabled ||
							this._element.classList.contains("disabled") ||
							this._menu.classList.contains("show")
						)
					) {
						var e = t.getParentFromElement(this._element),
							i = { relatedTarget: this._element }
						if (!V.trigger(this._element, "show.bs.dropdown", i).defaultPrevented) {
							if (!this._inNavbar) {
								if (void 0 === n.default)
									throw new TypeError(
										"Bootstrap's dropdowns require Popper.js (https://popper.js.org)"
									)
								var o = this._element
								"parent" === this._config.reference
									? (o = e)
									: m(this._config.reference) &&
									  ((o = this._config.reference),
									  void 0 !== this._config.reference.jquery && (o = this._config.reference[0])),
									"scrollParent" !== this._config.boundary && e.classList.add("position-static"),
									(this._popper = new n.default(o, this._menu, this._getPopperConfig()))
							}
							var s
							if ("ontouchstart" in document.documentElement && !e.closest(".navbar-nav"))
								(s = []).concat.apply(s, document.body.children).forEach(function (t) {
									return V.on(t, "mouseover", null, function () {})
								})
							this._element.focus(),
								this._element.setAttribute("aria-expanded", !0),
								et.toggleClass(this._menu, "show"),
								et.toggleClass(this._element, "show"),
								V.trigger(e, "shown.bs.dropdown", i)
						}
					}
				}),
				(e.hide = function () {
					if (
						!this._element.disabled &&
						!this._element.classList.contains("disabled") &&
						this._menu.classList.contains("show")
					) {
						var e = t.getParentFromElement(this._element),
							n = { relatedTarget: this._element }
						V.trigger(e, "hide.bs.dropdown", n).defaultPrevented ||
							(this._popper && this._popper.destroy(),
							et.toggleClass(this._menu, "show"),
							et.toggleClass(this._element, "show"),
							V.trigger(e, "hidden.bs.dropdown", n))
					}
				}),
				(e.dispose = function () {
					C(this._element, "bs.dropdown"),
						V.off(this._element, ".bs.dropdown"),
						(this._element = null),
						(this._menu = null),
						this._popper && (this._popper.destroy(), (this._popper = null))
				}),
				(e.update = function () {
					;(this._inNavbar = this._detectNavbar()), this._popper && this._popper.scheduleUpdate()
				}),
				(e._addEventListeners = function () {
					var t = this
					V.on(this._element, "click.bs.dropdown", function (e) {
						e.preventDefault(), e.stopPropagation(), t.toggle()
					})
				}),
				(e._getConfig = function (t) {
					return (
						(t = s({}, this.constructor.Default, et.getDataAttributes(this._element), t)),
						v(_t, t, this.constructor.DefaultType),
						t
					)
				}),
				(e._getMenuElement = function () {
					return nt.next(this._element, ".dropdown-menu")[0]
				}),
				(e._getPlacement = function () {
					var t = this._element.parentNode,
						e = "bottom-start"
					return (
						t.classList.contains("dropup")
							? ((e = "top-start"),
							  this._menu.classList.contains("dropdown-menu-right") && (e = "top-end"))
							: t.classList.contains("dropright")
							? (e = "right-start")
							: t.classList.contains("dropleft")
							? (e = "left-start")
							: this._menu.classList.contains("dropdown-menu-right") && (e = "bottom-end"),
						e
					)
				}),
				(e._detectNavbar = function () {
					return Boolean(this._element.closest(".navbar"))
				}),
				(e._getOffset = function () {
					var t = this,
						e = {}
					return (
						"function" == typeof this._config.offset
							? (e.fn = function (e) {
									return (
										(e.offsets = s({}, e.offsets, t._config.offset(e.offsets, t._element) || {})), e
									)
							  })
							: (e.offset = this._config.offset),
						e
					)
				}),
				(e._getPopperConfig = function () {
					var t = {
						placement: this._getPlacement(),
						modifiers: {
							offset: this._getOffset(),
							flip: { enabled: this._config.flip },
							preventOverflow: { boundariesElement: this._config.boundary },
						},
					}
					return (
						"static" === this._config.display && (t.modifiers.applyStyle = { enabled: !1 }),
						s({}, t, this._config.popperConfig)
					)
				}),
				(t.dropdownInterface = function (e, n) {
					var i = L(e, "bs.dropdown")
					if ((i || (i = new t(e, "object" == typeof n ? n : null)), "string" == typeof n)) {
						if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"')
						i[n]()
					}
				}),
				(t.jQueryInterface = function (e) {
					return this.each(function () {
						t.dropdownInterface(this, e)
					})
				}),
				(t.clearMenus = function (e) {
					if (!e || (2 !== e.button && ("keyup" !== e.type || "Tab" === e.key)))
						for (var n = nt.find('[data-toggle="dropdown"]'), i = 0, o = n.length; i < o; i++) {
							var s = t.getParentFromElement(n[i]),
								r = L(n[i], "bs.dropdown"),
								a = { relatedTarget: n[i] }
							if ((e && "click" === e.type && (a.clickEvent = e), r)) {
								var l = r._menu
								if (n[i].classList.contains("show"))
									if (
										!(
											e &&
											(("click" === e.type && /input|textarea/i.test(e.target.tagName)) ||
												("keyup" === e.type && "Tab" === e.key)) &&
											l.contains(e.target)
										)
									)
										if (!V.trigger(s, "hide.bs.dropdown", a).defaultPrevented) {
											var c
											if ("ontouchstart" in document.documentElement)
												(c = []).concat.apply(c, document.body.children).forEach(function (t) {
													return V.off(t, "mouseover", null, function () {})
												})
											n[i].setAttribute("aria-expanded", "false"),
												r._popper && r._popper.destroy(),
												l.classList.remove("show"),
												n[i].classList.remove("show"),
												V.trigger(s, "hidden.bs.dropdown", a)
										}
							}
						}
				}),
				(t.getParentFromElement = function (t) {
					return d(t) || t.parentNode
				}),
				(t.dataApiKeydownHandler = function (e) {
					if (
						!(/input|textarea/i.test(e.target.tagName)
							? "Space" === e.key ||
							  ("Escape" !== e.key &&
									(("ArrowDown" !== e.key && "ArrowUp" !== e.key) ||
										e.target.closest(".dropdown-menu")))
							: !vt.test(e.key)) &&
						(e.preventDefault(),
						e.stopPropagation(),
						!this.disabled && !this.classList.contains("disabled"))
					) {
						var n = t.getParentFromElement(this),
							i = this.classList.contains("show")
						if ("Escape" === e.key)
							return (
								(this.matches('[data-toggle="dropdown"]')
									? this
									: nt.prev(this, '[data-toggle="dropdown"]')[0]
								).focus(),
								void t.clearMenus()
							)
						if (i && "Space" !== e.key) {
							var o = nt
								.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", n)
								.filter(b)
							if (o.length) {
								var s = o.indexOf(e.target)
								"ArrowUp" === e.key && s > 0 && s--,
									"ArrowDown" === e.key && s < o.length - 1 && s++,
									o[(s = -1 === s ? 0 : s)].focus()
							}
						} else t.clearMenus()
					}
				}),
				(t.getInstance = function (t) {
					return L(t, "bs.dropdown")
				}),
				o(t, null, [
					{
						key: "VERSION",
						get: function () {
							return "5.0.0-alpha2"
						},
					},
					{
						key: "Default",
						get: function () {
							return bt
						},
					},
					{
						key: "DefaultType",
						get: function () {
							return yt
						},
					},
				]),
				t
			)
		})()
	V.on(
		document,
		"keydown.bs.dropdown.data-api",
		'[data-toggle="dropdown"]',
		wt.dataApiKeydownHandler
	),
		V.on(document, "keydown.bs.dropdown.data-api", ".dropdown-menu", wt.dataApiKeydownHandler),
		V.on(document, "click.bs.dropdown.data-api", wt.clearMenus),
		V.on(document, "keyup.bs.dropdown.data-api", wt.clearMenus),
		V.on(document, "click.bs.dropdown.data-api", '[data-toggle="dropdown"]', function (t) {
			t.preventDefault(), t.stopPropagation(), wt.dropdownInterface(this, "toggle")
		}),
		V.on(document, "click.bs.dropdown.data-api", ".dropdown form", function (t) {
			return t.stopPropagation()
		})
	var Et = E()
	if (Et) {
		var Tt = Et.fn[_t]
		;(Et.fn[_t] = wt.jQueryInterface),
			(Et.fn[_t].Constructor = wt),
			(Et.fn[_t].noConflict = function () {
				return (Et.fn[_t] = Tt), wt.jQueryInterface
			})
	}
	var kt = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
		Lt = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean" },
		Ct = (function () {
			function t(t, e) {
				;(this._config = this._getConfig(e)),
					(this._element = t),
					(this._dialog = nt.findOne(".modal-dialog", t)),
					(this._backdrop = null),
					(this._isShown = !1),
					(this._isBodyOverflowing = !1),
					(this._ignoreBackdropClick = !1),
					(this._isTransitioning = !1),
					(this._scrollbarWidth = 0),
					k(t, "bs.modal", this)
			}
			var e = t.prototype
			return (
				(e.toggle = function (t) {
					return this._isShown ? this.hide() : this.show(t)
				}),
				(e.show = function (t) {
					var e = this
					if (!this._isShown && !this._isTransitioning) {
						this._element.classList.contains("fade") && (this._isTransitioning = !0)
						var n = V.trigger(this._element, "show.bs.modal", { relatedTarget: t })
						this._isShown ||
							n.defaultPrevented ||
							((this._isShown = !0),
							this._checkScrollbar(),
							this._setScrollbar(),
							this._adjustDialog(),
							this._setEscapeEvent(),
							this._setResizeEvent(),
							V.on(this._element, "click.dismiss.bs.modal", '[data-dismiss="modal"]', function (t) {
								return e.hide(t)
							}),
							V.on(this._dialog, "mousedown.dismiss.bs.modal", function () {
								V.one(e._element, "mouseup.dismiss.bs.modal", function (t) {
									t.target === e._element && (e._ignoreBackdropClick = !0)
								})
							}),
							this._showBackdrop(function () {
								return e._showElement(t)
							}))
					}
				}),
				(e.hide = function (t) {
					var e = this
					if (
						(t && t.preventDefault(), this._isShown && !this._isTransitioning) &&
						!V.trigger(this._element, "hide.bs.modal").defaultPrevented
					) {
						this._isShown = !1
						var n = this._element.classList.contains("fade")
						if (
							(n && (this._isTransitioning = !0),
							this._setEscapeEvent(),
							this._setResizeEvent(),
							V.off(document, "focusin.bs.modal"),
							this._element.classList.remove("show"),
							V.off(this._element, "click.dismiss.bs.modal"),
							V.off(this._dialog, "mousedown.dismiss.bs.modal"),
							n)
						) {
							var i = g(this._element)
							V.one(this._element, "transitionend", function (t) {
								return e._hideModal(t)
							}),
								_(this._element, i)
						} else this._hideModal()
					}
				}),
				(e.dispose = function () {
					;[window, this._element, this._dialog].forEach(function (t) {
						return V.off(t, ".bs.modal")
					}),
						V.off(document, "focusin.bs.modal"),
						C(this._element, "bs.modal"),
						(this._config = null),
						(this._element = null),
						(this._dialog = null),
						(this._backdrop = null),
						(this._isShown = null),
						(this._isBodyOverflowing = null),
						(this._ignoreBackdropClick = null),
						(this._isTransitioning = null),
						(this._scrollbarWidth = null)
				}),
				(e.handleUpdate = function () {
					this._adjustDialog()
				}),
				(e._getConfig = function (t) {
					return (t = s({}, kt, t)), v("modal", t, Lt), t
				}),
				(e._showElement = function (t) {
					var e = this,
						n = this._element.classList.contains("fade"),
						i = nt.findOne(".modal-body", this._dialog)
					;(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
						document.body.appendChild(this._element),
						(this._element.style.display = "block"),
						this._element.removeAttribute("aria-hidden"),
						this._element.setAttribute("aria-modal", !0),
						this._element.setAttribute("role", "dialog"),
						(this._element.scrollTop = 0),
						i && (i.scrollTop = 0),
						n && w(this._element),
						this._element.classList.add("show"),
						this._config.focus && this._enforceFocus()
					var o = function () {
						e._config.focus && e._element.focus(),
							(e._isTransitioning = !1),
							V.trigger(e._element, "shown.bs.modal", { relatedTarget: t })
					}
					if (n) {
						var s = g(this._dialog)
						V.one(this._dialog, "transitionend", o), _(this._dialog, s)
					} else o()
				}),
				(e._enforceFocus = function () {
					var t = this
					V.off(document, "focusin.bs.modal"),
						V.on(document, "focusin.bs.modal", function (e) {
							document === e.target ||
								t._element === e.target ||
								t._element.contains(e.target) ||
								t._element.focus()
						})
				}),
				(e._setEscapeEvent = function () {
					var t = this
					this._isShown
						? V.on(this._element, "keydown.dismiss.bs.modal", function (e) {
								t._config.keyboard && "Escape" === e.key
									? (e.preventDefault(), t.hide())
									: t._config.keyboard || "Escape" !== e.key || t._triggerBackdropTransition()
						  })
						: V.off(this._element, "keydown.dismiss.bs.modal")
				}),
				(e._setResizeEvent = function () {
					var t = this
					this._isShown
						? V.on(window, "resize.bs.modal", function () {
								return t._adjustDialog()
						  })
						: V.off(window, "resize.bs.modal")
				}),
				(e._hideModal = function () {
					var t = this
					;(this._element.style.display = "none"),
						this._element.setAttribute("aria-hidden", !0),
						this._element.removeAttribute("aria-modal"),
						this._element.removeAttribute("role"),
						(this._isTransitioning = !1),
						this._showBackdrop(function () {
							document.body.classList.remove("modal-open"),
								t._resetAdjustments(),
								t._resetScrollbar(),
								V.trigger(t._element, "hidden.bs.modal")
						})
				}),
				(e._removeBackdrop = function () {
					this._backdrop.parentNode.removeChild(this._backdrop), (this._backdrop = null)
				}),
				(e._showBackdrop = function (t) {
					var e = this,
						n = this._element.classList.contains("fade") ? "fade" : ""
					if (this._isShown && this._config.backdrop) {
						if (
							((this._backdrop = document.createElement("div")),
							(this._backdrop.className = "modal-backdrop"),
							n && this._backdrop.classList.add(n),
							document.body.appendChild(this._backdrop),
							V.on(this._element, "click.dismiss.bs.modal", function (t) {
								e._ignoreBackdropClick
									? (e._ignoreBackdropClick = !1)
									: t.target === t.currentTarget && e._triggerBackdropTransition()
							}),
							n && w(this._backdrop),
							this._backdrop.classList.add("show"),
							!n)
						)
							return void t()
						var i = g(this._backdrop)
						V.one(this._backdrop, "transitionend", t), _(this._backdrop, i)
					} else if (!this._isShown && this._backdrop) {
						this._backdrop.classList.remove("show")
						var o = function () {
							e._removeBackdrop(), t()
						}
						if (this._element.classList.contains("fade")) {
							var s = g(this._backdrop)
							V.one(this._backdrop, "transitionend", o), _(this._backdrop, s)
						} else o()
					} else t()
				}),
				(e._triggerBackdropTransition = function () {
					var t = this
					if ("static" === this._config.backdrop) {
						if (V.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return
						var e = this._element.scrollHeight > document.documentElement.clientHeight
						e || (this._element.style.overflowY = "hidden"),
							this._element.classList.add("modal-static")
						var n = g(this._dialog)
						V.off(this._element, "transitionend"),
							V.one(this._element, "transitionend", function () {
								t._element.classList.remove("modal-static"),
									e ||
										(V.one(t._element, "transitionend", function () {
											t._element.style.overflowY = ""
										}),
										_(t._element, n))
							}),
							_(this._element, n),
							this._element.focus()
					} else this.hide()
				}),
				(e._adjustDialog = function () {
					var t = this._element.scrollHeight > document.documentElement.clientHeight
					!this._isBodyOverflowing &&
						t &&
						(this._element.style.paddingLeft = this._scrollbarWidth + "px"),
						this._isBodyOverflowing &&
							!t &&
							(this._element.style.paddingRight = this._scrollbarWidth + "px")
				}),
				(e._resetAdjustments = function () {
					;(this._element.style.paddingLeft = ""), (this._element.style.paddingRight = "")
				}),
				(e._checkScrollbar = function () {
					var t = document.body.getBoundingClientRect()
					;(this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth),
						(this._scrollbarWidth = this._getScrollbarWidth())
				}),
				(e._setScrollbar = function () {
					var t = this
					if (this._isBodyOverflowing) {
						nt.find(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top").forEach(function (e) {
							var n = e.style.paddingRight,
								i = window.getComputedStyle(e)["padding-right"]
							et.setDataAttribute(e, "padding-right", n),
								(e.style.paddingRight = parseFloat(i) + t._scrollbarWidth + "px")
						}),
							nt.find(".sticky-top").forEach(function (e) {
								var n = e.style.marginRight,
									i = window.getComputedStyle(e)["margin-right"]
								et.setDataAttribute(e, "margin-right", n),
									(e.style.marginRight = parseFloat(i) - t._scrollbarWidth + "px")
							})
						var e = document.body.style.paddingRight,
							n = window.getComputedStyle(document.body)["padding-right"]
						et.setDataAttribute(document.body, "padding-right", e),
							(document.body.style.paddingRight = parseFloat(n) + this._scrollbarWidth + "px")
					}
					document.body.classList.add("modal-open")
				}),
				(e._resetScrollbar = function () {
					nt.find(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top").forEach(function (t) {
						var e = et.getDataAttribute(t, "padding-right")
						void 0 !== e && (et.removeDataAttribute(t, "padding-right"), (t.style.paddingRight = e))
					}),
						nt.find(".sticky-top").forEach(function (t) {
							var e = et.getDataAttribute(t, "margin-right")
							void 0 !== e && (et.removeDataAttribute(t, "margin-right"), (t.style.marginRight = e))
						})
					var t = et.getDataAttribute(document.body, "padding-right")
					void 0 === t
						? (document.body.style.paddingRight = "")
						: (et.removeDataAttribute(document.body, "padding-right"),
						  (document.body.style.paddingRight = t))
				}),
				(e._getScrollbarWidth = function () {
					var t = document.createElement("div")
					;(t.className = "modal-scrollbar-measure"), document.body.appendChild(t)
					var e = t.getBoundingClientRect().width - t.clientWidth
					return document.body.removeChild(t), e
				}),
				(t.jQueryInterface = function (e, n) {
					return this.each(function () {
						var i = L(this, "bs.modal"),
							o = s({}, kt, et.getDataAttributes(this), "object" == typeof e && e ? e : {})
						if ((i || (i = new t(this, o)), "string" == typeof e)) {
							if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"')
							i[e](n)
						} else o.show && i.show(n)
					})
				}),
				(t.getInstance = function (t) {
					return L(t, "bs.modal")
				}),
				o(t, null, [
					{
						key: "VERSION",
						get: function () {
							return "5.0.0-alpha2"
						},
					},
					{
						key: "Default",
						get: function () {
							return kt
						},
					},
				]),
				t
			)
		})()
	V.on(document, "click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
		var e = this,
			n = d(this)
		;("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault(),
			V.one(n, "show.bs.modal", function (t) {
				t.defaultPrevented ||
					V.one(n, "hidden.bs.modal", function () {
						b(e) && e.focus()
					})
			})
		var i = L(n, "bs.modal")
		if (!i) {
			var o = s({}, et.getDataAttributes(n), et.getDataAttributes(this))
			i = new Ct(n, o)
		}
		i.show(this)
	})
	var At = E()
	if (At) {
		var St = At.fn.modal
		;(At.fn.modal = Ct.jQueryInterface),
			(At.fn.modal.Constructor = Ct),
			(At.fn.modal.noConflict = function () {
				return (At.fn.modal = St), Ct.jQueryInterface
			})
	}
	var Dt = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
		It = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
		Ot =
			/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
		Nt = {
			"*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
			a: ["target", "href", "title", "rel"],
			area: [],
			b: [],
			br: [],
			col: [],
			code: [],
			div: [],
			em: [],
			hr: [],
			h1: [],
			h2: [],
			h3: [],
			h4: [],
			h5: [],
			h6: [],
			i: [],
			img: ["src", "srcset", "alt", "title", "width", "height"],
			li: [],
			ol: [],
			p: [],
			pre: [],
			s: [],
			small: [],
			span: [],
			sub: [],
			sup: [],
			strong: [],
			u: [],
			ul: [],
		}
	function jt(t, e, n) {
		var i
		if (!t.length) return t
		if (n && "function" == typeof n) return n(t)
		for (
			var o = new window.DOMParser().parseFromString(t, "text/html"),
				s = Object.keys(e),
				r = (i = []).concat.apply(i, o.body.querySelectorAll("*")),
				a = function (t, n) {
					var i,
						o = r[t],
						a = o.nodeName.toLowerCase()
					if (-1 === s.indexOf(a)) return o.parentNode.removeChild(o), "continue"
					var l = (i = []).concat.apply(i, o.attributes),
						c = [].concat(e["*"] || [], e[a] || [])
					l.forEach(function (t) {
						;(function (t, e) {
							var n = t.nodeName.toLowerCase()
							if (-1 !== e.indexOf(n))
								return (
									-1 === Dt.indexOf(n) || Boolean(t.nodeValue.match(It) || t.nodeValue.match(Ot))
								)
							for (
								var i = e.filter(function (t) {
										return t instanceof RegExp
									}),
									o = 0,
									s = i.length;
								o < s;
								o++
							)
								if (n.match(i[o])) return !0
							return !1
						})(t, c) || o.removeAttribute(t.nodeName)
					})
				},
				l = 0,
				c = r.length;
			l < c;
			l++
		)
			a(l)
		return o.body.innerHTML
	}
	var xt = "tooltip",
		Pt = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
		Rt = ["sanitize", "allowList", "sanitizeFn"],
		Ht = {
			animation: "boolean",
			template: "string",
			title: "(string|element|function)",
			trigger: "string",
			delay: "(number|object)",
			html: "boolean",
			selector: "(string|boolean)",
			placement: "(string|function)",
			offset: "(number|string|function)",
			container: "(string|element|boolean)",
			fallbackPlacement: "(string|array)",
			boundary: "(string|element)",
			sanitize: "boolean",
			sanitizeFn: "(null|function)",
			allowList: "object",
			popperConfig: "(null|object)",
		},
		Bt = { AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" },
		Mt = {
			animation: !0,
			template:
				'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
			trigger: "hover focus",
			title: "",
			delay: 0,
			html: !1,
			selector: !1,
			placement: "top",
			offset: 0,
			container: !1,
			fallbackPlacement: "flip",
			boundary: "scrollParent",
			sanitize: !0,
			sanitizeFn: null,
			allowList: Nt,
			popperConfig: null,
		},
		Qt = {
			HIDE: "hide.bs.tooltip",
			HIDDEN: "hidden.bs.tooltip",
			SHOW: "show.bs.tooltip",
			SHOWN: "shown.bs.tooltip",
			INSERTED: "inserted.bs.tooltip",
			CLICK: "click.bs.tooltip",
			FOCUSIN: "focusin.bs.tooltip",
			FOCUSOUT: "focusout.bs.tooltip",
			MOUSEENTER: "mouseenter.bs.tooltip",
			MOUSELEAVE: "mouseleave.bs.tooltip",
		},
		Ut = (function () {
			function t(t, e) {
				if (void 0 === n.default)
					throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org)")
				;(this._isEnabled = !0),
					(this._timeout = 0),
					(this._hoverState = ""),
					(this._activeTrigger = {}),
					(this._popper = null),
					(this.element = t),
					(this.config = this._getConfig(e)),
					(this.tip = null),
					this._setListeners(),
					k(t, this.constructor.DATA_KEY, this)
			}
			var e = t.prototype
			return (
				(e.enable = function () {
					this._isEnabled = !0
				}),
				(e.disable = function () {
					this._isEnabled = !1
				}),
				(e.toggleEnabled = function () {
					this._isEnabled = !this._isEnabled
				}),
				(e.toggle = function (t) {
					if (this._isEnabled)
						if (t) {
							var e = this.constructor.DATA_KEY,
								n = L(t.delegateTarget, e)
							n ||
								((n = new this.constructor(t.delegateTarget, this._getDelegateConfig())),
								k(t.delegateTarget, e, n)),
								(n._activeTrigger.click = !n._activeTrigger.click),
								n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
						} else {
							if (this.getTipElement().classList.contains("show"))
								return void this._leave(null, this)
							this._enter(null, this)
						}
				}),
				(e.dispose = function () {
					clearTimeout(this._timeout),
						C(this.element, this.constructor.DATA_KEY),
						V.off(this.element, this.constructor.EVENT_KEY),
						V.off(this.element.closest(".modal"), "hide.bs.modal", this._hideModalHandler),
						this.tip && this.tip.parentNode.removeChild(this.tip),
						(this._isEnabled = null),
						(this._timeout = null),
						(this._hoverState = null),
						(this._activeTrigger = null),
						this._popper && this._popper.destroy(),
						(this._popper = null),
						(this.element = null),
						(this.config = null),
						(this.tip = null)
				}),
				(e.show = function () {
					var t = this
					if ("none" === this.element.style.display)
						throw new Error("Please use show on visible elements")
					if (this.isWithContent() && this._isEnabled) {
						var e = V.trigger(this.element, this.constructor.Event.SHOW),
							i = (function t(e) {
								if (!document.documentElement.attachShadow) return null
								if ("function" == typeof e.getRootNode) {
									var n = e.getRootNode()
									return n instanceof ShadowRoot ? n : null
								}
								return e instanceof ShadowRoot ? e : e.parentNode ? t(e.parentNode) : null
							})(this.element),
							o =
								null === i
									? this.element.ownerDocument.documentElement.contains(this.element)
									: i.contains(this.element)
						if (e.defaultPrevented || !o) return
						var s = this.getTipElement(),
							r = u(this.constructor.NAME)
						s.setAttribute("id", r),
							this.element.setAttribute("aria-describedby", r),
							this.setContent(),
							this.config.animation && s.classList.add("fade")
						var a =
								"function" == typeof this.config.placement
									? this.config.placement.call(this, s, this.element)
									: this.config.placement,
							l = this._getAttachment(a)
						this._addAttachmentClass(l)
						var c,
							h = this._getContainer()
						if (
							(k(s, this.constructor.DATA_KEY, this),
							this.element.ownerDocument.documentElement.contains(this.tip) || h.appendChild(s),
							V.trigger(this.element, this.constructor.Event.INSERTED),
							(this._popper = new n.default(this.element, s, this._getPopperConfig(l))),
							s.classList.add("show"),
							"ontouchstart" in document.documentElement)
						)
							(c = []).concat.apply(c, document.body.children).forEach(function (t) {
								V.on(t, "mouseover", function () {})
							})
						var f = function () {
							t.config.animation && t._fixTransition()
							var e = t._hoverState
							;(t._hoverState = null),
								V.trigger(t.element, t.constructor.Event.SHOWN),
								"out" === e && t._leave(null, t)
						}
						if (this.tip.classList.contains("fade")) {
							var d = g(this.tip)
							V.one(this.tip, "transitionend", f), _(this.tip, d)
						} else f()
					}
				}),
				(e.hide = function () {
					var t = this
					if (this._popper) {
						var e = this.getTipElement(),
							n = function () {
								"show" !== t._hoverState && e.parentNode && e.parentNode.removeChild(e),
									t._cleanTipClass(),
									t.element.removeAttribute("aria-describedby"),
									V.trigger(t.element, t.constructor.Event.HIDDEN),
									t._popper.destroy()
							}
						if (!V.trigger(this.element, this.constructor.Event.HIDE).defaultPrevented) {
							var i
							if ((e.classList.remove("show"), "ontouchstart" in document.documentElement))
								(i = []).concat.apply(i, document.body.children).forEach(function (t) {
									return V.off(t, "mouseover", y)
								})
							if (
								((this._activeTrigger.click = !1),
								(this._activeTrigger.focus = !1),
								(this._activeTrigger.hover = !1),
								this.tip.classList.contains("fade"))
							) {
								var o = g(e)
								V.one(e, "transitionend", n), _(e, o)
							} else n()
							this._hoverState = ""
						}
					}
				}),
				(e.update = function () {
					null !== this._popper && this._popper.scheduleUpdate()
				}),
				(e.isWithContent = function () {
					return Boolean(this.getTitle())
				}),
				(e.getTipElement = function () {
					if (this.tip) return this.tip
					var t = document.createElement("div")
					return (t.innerHTML = this.config.template), (this.tip = t.children[0]), this.tip
				}),
				(e.setContent = function () {
					var t = this.getTipElement()
					this.setElementContent(nt.findOne(".tooltip-inner", t), this.getTitle()),
						t.classList.remove("fade", "show")
				}),
				(e.setElementContent = function (t, e) {
					if (null !== t)
						return "object" == typeof e && m(e)
							? (e.jquery && (e = e[0]),
							  void (this.config.html
									? e.parentNode !== t && ((t.innerHTML = ""), t.appendChild(e))
									: (t.textContent = e.textContent)))
							: void (this.config.html
									? (this.config.sanitize &&
											(e = jt(e, this.config.allowList, this.config.sanitizeFn)),
									  (t.innerHTML = e))
									: (t.textContent = e))
				}),
				(e.getTitle = function () {
					var t = this.element.getAttribute("data-original-title")
					return (
						t ||
							(t =
								"function" == typeof this.config.title
									? this.config.title.call(this.element)
									: this.config.title),
						t
					)
				}),
				(e._getPopperConfig = function (t) {
					var e = this
					return s(
						{},
						{
							placement: t,
							modifiers: {
								offset: this._getOffset(),
								flip: { behavior: this.config.fallbackPlacement },
								arrow: { element: "." + this.constructor.NAME + "-arrow" },
								preventOverflow: { boundariesElement: this.config.boundary },
							},
							onCreate: function (t) {
								t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
							},
							onUpdate: function (t) {
								return e._handlePopperPlacementChange(t)
							},
						},
						this.config.popperConfig
					)
				}),
				(e._addAttachmentClass = function (t) {
					this.getTipElement().classList.add("bs-tooltip-" + t)
				}),
				(e._getOffset = function () {
					var t = this,
						e = {}
					return (
						"function" == typeof this.config.offset
							? (e.fn = function (e) {
									return (
										(e.offsets = s({}, e.offsets, t.config.offset(e.offsets, t.element) || {})), e
									)
							  })
							: (e.offset = this.config.offset),
						e
					)
				}),
				(e._getContainer = function () {
					return !1 === this.config.container
						? document.body
						: m(this.config.container)
						? this.config.container
						: nt.findOne(this.config.container)
				}),
				(e._getAttachment = function (t) {
					return Bt[t.toUpperCase()]
				}),
				(e._setListeners = function () {
					var t = this
					this.config.trigger.split(" ").forEach(function (e) {
						if ("click" === e)
							V.on(t.element, t.constructor.Event.CLICK, t.config.selector, function (e) {
								return t.toggle(e)
							})
						else if ("manual" !== e) {
							var n = "hover" === e ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
								i = "hover" === e ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT
							V.on(t.element, n, t.config.selector, function (e) {
								return t._enter(e)
							}),
								V.on(t.element, i, t.config.selector, function (e) {
									return t._leave(e)
								})
						}
					}),
						(this._hideModalHandler = function () {
							t.element && t.hide()
						}),
						V.on(this.element.closest(".modal"), "hide.bs.modal", this._hideModalHandler),
						this.config.selector
							? (this.config = s({}, this.config, { trigger: "manual", selector: "" }))
							: this._fixTitle()
				}),
				(e._fixTitle = function () {
					var t = typeof this.element.getAttribute("data-original-title")
					;(this.element.getAttribute("title") || "string" !== t) &&
						(this.element.setAttribute(
							"data-original-title",
							this.element.getAttribute("title") || ""
						),
						this.element.setAttribute("title", ""))
				}),
				(e._enter = function (t, e) {
					var n = this.constructor.DATA_KEY
					;(e = e || L(t.delegateTarget, n)) ||
						((e = new this.constructor(t.delegateTarget, this._getDelegateConfig())),
						k(t.delegateTarget, n, e)),
						t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0),
						e.getTipElement().classList.contains("show") || "show" === e._hoverState
							? (e._hoverState = "show")
							: (clearTimeout(e._timeout),
							  (e._hoverState = "show"),
							  e.config.delay && e.config.delay.show
									? (e._timeout = setTimeout(function () {
											"show" === e._hoverState && e.show()
									  }, e.config.delay.show))
									: e.show())
				}),
				(e._leave = function (t, e) {
					var n = this.constructor.DATA_KEY
					;(e = e || L(t.delegateTarget, n)) ||
						((e = new this.constructor(t.delegateTarget, this._getDelegateConfig())),
						k(t.delegateTarget, n, e)),
						t && (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] = !1),
						e._isWithActiveTrigger() ||
							(clearTimeout(e._timeout),
							(e._hoverState = "out"),
							e.config.delay && e.config.delay.hide
								? (e._timeout = setTimeout(function () {
										"out" === e._hoverState && e.hide()
								  }, e.config.delay.hide))
								: e.hide())
				}),
				(e._isWithActiveTrigger = function () {
					for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0
					return !1
				}),
				(e._getConfig = function (t) {
					var e = et.getDataAttributes(this.element)
					return (
						Object.keys(e).forEach(function (t) {
							;-1 !== Rt.indexOf(t) && delete e[t]
						}),
						t &&
							"object" == typeof t.container &&
							t.container.jquery &&
							(t.container = t.container[0]),
						"number" ==
							typeof (t = s({}, this.constructor.Default, e, "object" == typeof t && t ? t : {}))
								.delay && (t.delay = { show: t.delay, hide: t.delay }),
						"number" == typeof t.title && (t.title = t.title.toString()),
						"number" == typeof t.content && (t.content = t.content.toString()),
						v(xt, t, this.constructor.DefaultType),
						t.sanitize && (t.template = jt(t.template, t.allowList, t.sanitizeFn)),
						t
					)
				}),
				(e._getDelegateConfig = function () {
					var t = {}
					if (this.config)
						for (var e in this.config)
							this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e])
					return t
				}),
				(e._cleanTipClass = function () {
					var t = this.getTipElement(),
						e = t.getAttribute("class").match(Pt)
					null !== e &&
						e.length > 0 &&
						e
							.map(function (t) {
								return t.trim()
							})
							.forEach(function (e) {
								return t.classList.remove(e)
							})
				}),
				(e._handlePopperPlacementChange = function (t) {
					;(this.tip = t.instance.popper),
						this._cleanTipClass(),
						this._addAttachmentClass(this._getAttachment(t.placement))
				}),
				(e._fixTransition = function () {
					var t = this.getTipElement(),
						e = this.config.animation
					null === t.getAttribute("x-placement") &&
						(t.classList.remove("fade"),
						(this.config.animation = !1),
						this.hide(),
						this.show(),
						(this.config.animation = e))
				}),
				(t.jQueryInterface = function (e) {
					return this.each(function () {
						var n = L(this, "bs.tooltip"),
							i = "object" == typeof e && e
						if (
							(n || !/dispose|hide/.test(e)) &&
							(n || (n = new t(this, i)), "string" == typeof e)
						) {
							if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"')
							n[e]()
						}
					})
				}),
				(t.getInstance = function (t) {
					return L(t, "bs.tooltip")
				}),
				o(t, null, [
					{
						key: "VERSION",
						get: function () {
							return "5.0.0-alpha2"
						},
					},
					{
						key: "Default",
						get: function () {
							return Mt
						},
					},
					{
						key: "NAME",
						get: function () {
							return xt
						},
					},
					{
						key: "DATA_KEY",
						get: function () {
							return "bs.tooltip"
						},
					},
					{
						key: "Event",
						get: function () {
							return Qt
						},
					},
					{
						key: "EVENT_KEY",
						get: function () {
							return ".bs.tooltip"
						},
					},
					{
						key: "DefaultType",
						get: function () {
							return Ht
						},
					},
				]),
				t
			)
		})(),
		Ft = E()
	if (Ft) {
		var Wt = Ft.fn[xt]
		;(Ft.fn[xt] = Ut.jQueryInterface),
			(Ft.fn[xt].Constructor = Ut),
			(Ft.fn[xt].noConflict = function () {
				return (Ft.fn[xt] = Wt), Ut.jQueryInterface
			})
	}
	var Kt = "popover",
		Vt = new RegExp("(^|\\s)bs-popover\\S+", "g"),
		qt = s({}, Ut.Default, {
			placement: "right",
			trigger: "click",
			content: "",
			template:
				'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
		}),
		zt = s({}, Ut.DefaultType, { content: "(string|element|function)" }),
		Xt = {
			HIDE: "hide.bs.popover",
			HIDDEN: "hidden.bs.popover",
			SHOW: "show.bs.popover",
			SHOWN: "shown.bs.popover",
			INSERTED: "inserted.bs.popover",
			CLICK: "click.bs.popover",
			FOCUSIN: "focusin.bs.popover",
			FOCUSOUT: "focusout.bs.popover",
			MOUSEENTER: "mouseenter.bs.popover",
			MOUSELEAVE: "mouseleave.bs.popover",
		},
		Yt = (function (t) {
			var e, n
			function i() {
				return t.apply(this, arguments) || this
			}
			;(n = t),
				((e = i).prototype = Object.create(n.prototype)),
				(e.prototype.constructor = e),
				(e.__proto__ = n)
			var s = i.prototype
			return (
				(s.isWithContent = function () {
					return this.getTitle() || this._getContent()
				}),
				(s.setContent = function () {
					var t = this.getTipElement()
					this.setElementContent(nt.findOne(".popover-header", t), this.getTitle())
					var e = this._getContent()
					"function" == typeof e && (e = e.call(this.element)),
						this.setElementContent(nt.findOne(".popover-body", t), e),
						t.classList.remove("fade", "show")
				}),
				(s._addAttachmentClass = function (t) {
					this.getTipElement().classList.add("bs-popover-" + t)
				}),
				(s._getContent = function () {
					return this.element.getAttribute("data-content") || this.config.content
				}),
				(s._cleanTipClass = function () {
					var t = this.getTipElement(),
						e = t.getAttribute("class").match(Vt)
					null !== e &&
						e.length > 0 &&
						e
							.map(function (t) {
								return t.trim()
							})
							.forEach(function (e) {
								return t.classList.remove(e)
							})
				}),
				(i.jQueryInterface = function (t) {
					return this.each(function () {
						var e = L(this, "bs.popover"),
							n = "object" == typeof t ? t : null
						if (
							(e || !/dispose|hide/.test(t)) &&
							(e || ((e = new i(this, n)), k(this, "bs.popover", e)), "string" == typeof t)
						) {
							if (void 0 === e[t]) throw new TypeError('No method named "' + t + '"')
							e[t]()
						}
					})
				}),
				(i.getInstance = function (t) {
					return L(t, "bs.popover")
				}),
				o(i, null, [
					{
						key: "VERSION",
						get: function () {
							return "5.0.0-alpha2"
						},
					},
					{
						key: "Default",
						get: function () {
							return qt
						},
					},
					{
						key: "NAME",
						get: function () {
							return Kt
						},
					},
					{
						key: "DATA_KEY",
						get: function () {
							return "bs.popover"
						},
					},
					{
						key: "Event",
						get: function () {
							return Xt
						},
					},
					{
						key: "EVENT_KEY",
						get: function () {
							return ".bs.popover"
						},
					},
					{
						key: "DefaultType",
						get: function () {
							return zt
						},
					},
				]),
				i
			)
		})(Ut),
		$t = E()
	if ($t) {
		var Gt = $t.fn[Kt]
		;($t.fn[Kt] = Yt.jQueryInterface),
			($t.fn[Kt].Constructor = Yt),
			($t.fn[Kt].noConflict = function () {
				return ($t.fn[Kt] = Gt), Yt.jQueryInterface
			})
	}
	var Zt = "scrollspy",
		Jt = { offset: 10, method: "auto", target: "" },
		te = { offset: "number", method: "string", target: "(string|element)" },
		ee = (function () {
			function t(t, e) {
				var n = this
				;(this._element = t),
					(this._scrollElement = "BODY" === t.tagName ? window : t),
					(this._config = this._getConfig(e)),
					(this._selector =
						this._config.target +
						" .nav-link, " +
						this._config.target +
						" .list-group-item, " +
						this._config.target +
						" .dropdown-item"),
					(this._offsets = []),
					(this._targets = []),
					(this._activeTarget = null),
					(this._scrollHeight = 0),
					V.on(this._scrollElement, "scroll.bs.scrollspy", function (t) {
						return n._process(t)
					}),
					this.refresh(),
					this._process(),
					k(t, "bs.scrollspy", this)
			}
			var e = t.prototype
			return (
				(e.refresh = function () {
					var t = this,
						e = this._scrollElement === this._scrollElement.window ? "offset" : "position",
						n = "auto" === this._config.method ? e : this._config.method,
						i = "position" === n ? this._getScrollTop() : 0
					;(this._offsets = []),
						(this._targets = []),
						(this._scrollHeight = this._getScrollHeight()),
						nt
							.find(this._selector)
							.map(function (t) {
								var e = f(t),
									o = e ? nt.findOne(e) : null
								if (o) {
									var s = o.getBoundingClientRect()
									if (s.width || s.height) return [et[n](o).top + i, e]
								}
								return null
							})
							.filter(function (t) {
								return t
							})
							.sort(function (t, e) {
								return t[0] - e[0]
							})
							.forEach(function (e) {
								t._offsets.push(e[0]), t._targets.push(e[1])
							})
				}),
				(e.dispose = function () {
					C(this._element, "bs.scrollspy"),
						V.off(this._scrollElement, ".bs.scrollspy"),
						(this._element = null),
						(this._scrollElement = null),
						(this._config = null),
						(this._selector = null),
						(this._offsets = null),
						(this._targets = null),
						(this._activeTarget = null),
						(this._scrollHeight = null)
				}),
				(e._getConfig = function (t) {
					if (
						"string" != typeof (t = s({}, Jt, "object" == typeof t && t ? t : {})).target &&
						m(t.target)
					) {
						var e = t.target.id
						e || ((e = u(Zt)), (t.target.id = e)), (t.target = "#" + e)
					}
					return v(Zt, t, te), t
				}),
				(e._getScrollTop = function () {
					return this._scrollElement === window
						? this._scrollElement.pageYOffset
						: this._scrollElement.scrollTop
				}),
				(e._getScrollHeight = function () {
					return (
						this._scrollElement.scrollHeight ||
						Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
					)
				}),
				(e._getOffsetHeight = function () {
					return this._scrollElement === window
						? window.innerHeight
						: this._scrollElement.getBoundingClientRect().height
				}),
				(e._process = function () {
					var t = this._getScrollTop() + this._config.offset,
						e = this._getScrollHeight(),
						n = this._config.offset + e - this._getOffsetHeight()
					if ((this._scrollHeight !== e && this.refresh(), t >= n)) {
						var i = this._targets[this._targets.length - 1]
						this._activeTarget !== i && this._activate(i)
					} else {
						if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0)
							return (this._activeTarget = null), void this._clear()
						for (var o = this._offsets.length; o--; ) {
							this._activeTarget !== this._targets[o] &&
								t >= this._offsets[o] &&
								(void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) &&
								this._activate(this._targets[o])
						}
					}
				}),
				(e._activate = function (t) {
					;(this._activeTarget = t), this._clear()
					var e = this._selector.split(",").map(function (e) {
							return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
						}),
						n = nt.findOne(e.join(","))
					n.classList.contains("dropdown-item")
						? (nt.findOne(".dropdown-toggle", n.closest(".dropdown")).classList.add("active"),
						  n.classList.add("active"))
						: (n.classList.add("active"),
						  nt.parents(n, ".nav, .list-group").forEach(function (t) {
								nt.prev(t, ".nav-link, .list-group-item").forEach(function (t) {
									return t.classList.add("active")
								}),
									nt.prev(t, ".nav-item").forEach(function (t) {
										nt.children(t, ".nav-link").forEach(function (t) {
											return t.classList.add("active")
										})
									})
						  })),
						V.trigger(this._scrollElement, "activate.bs.scrollspy", { relatedTarget: t })
				}),
				(e._clear = function () {
					nt.find(this._selector)
						.filter(function (t) {
							return t.classList.contains("active")
						})
						.forEach(function (t) {
							return t.classList.remove("active")
						})
				}),
				(t.jQueryInterface = function (e) {
					return this.each(function () {
						var n = L(this, "bs.scrollspy")
						if ((n || (n = new t(this, "object" == typeof e && e)), "string" == typeof e)) {
							if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"')
							n[e]()
						}
					})
				}),
				(t.getInstance = function (t) {
					return L(t, "bs.scrollspy")
				}),
				o(t, null, [
					{
						key: "VERSION",
						get: function () {
							return "5.0.0-alpha2"
						},
					},
					{
						key: "Default",
						get: function () {
							return Jt
						},
					},
				]),
				t
			)
		})()
	V.on(window, "load.bs.scrollspy.data-api", function () {
		nt.find('[data-spy="scroll"]').forEach(function (t) {
			return new ee(t, et.getDataAttributes(t))
		})
	})
	var ne = E()
	if (ne) {
		var ie = ne.fn[Zt]
		;(ne.fn[Zt] = ee.jQueryInterface),
			(ne.fn[Zt].Constructor = ee),
			(ne.fn[Zt].noConflict = function () {
				return (ne.fn[Zt] = ie), ee.jQueryInterface
			})
	}
	var oe = (function () {
		function t(t) {
			;(this._element = t), k(this._element, "bs.tab", this)
		}
		var e = t.prototype
		return (
			(e.show = function () {
				var t = this
				if (
					!(
						(this._element.parentNode &&
							this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
							this._element.classList.contains("active")) ||
						this._element.classList.contains("disabled")
					)
				) {
					var e,
						n = d(this._element),
						i = this._element.closest(".nav, .list-group")
					if (i) {
						var o = "UL" === i.nodeName || "OL" === i.nodeName ? ":scope > li > .active" : ".active"
						e = (e = nt.find(o, i))[e.length - 1]
					}
					var s = null
					if (
						(e && (s = V.trigger(e, "hide.bs.tab", { relatedTarget: this._element })),
						!(
							V.trigger(this._element, "show.bs.tab", { relatedTarget: e }).defaultPrevented ||
							(null !== s && s.defaultPrevented)
						))
					) {
						this._activate(this._element, i)
						var r = function () {
							V.trigger(e, "hidden.bs.tab", { relatedTarget: t._element }),
								V.trigger(t._element, "shown.bs.tab", { relatedTarget: e })
						}
						n ? this._activate(n, n.parentNode, r) : r()
					}
				}
			}),
			(e.dispose = function () {
				C(this._element, "bs.tab"), (this._element = null)
			}),
			(e._activate = function (t, e, n) {
				var i = this,
					o = (
						!e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
							? nt.children(e, ".active")
							: nt.find(":scope > li > .active", e)
					)[0],
					s = n && o && o.classList.contains("fade"),
					r = function () {
						return i._transitionComplete(t, o, n)
					}
				if (o && s) {
					var a = g(o)
					o.classList.remove("show"), V.one(o, "transitionend", r), _(o, a)
				} else r()
			}),
			(e._transitionComplete = function (t, e, n) {
				if (e) {
					e.classList.remove("active")
					var i = nt.findOne(":scope > .dropdown-menu .active", e.parentNode)
					i && i.classList.remove("active"),
						"tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
				}
				;(t.classList.add("active"),
				"tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0),
				w(t),
				t.classList.contains("fade") && t.classList.add("show"),
				t.parentNode && t.parentNode.classList.contains("dropdown-menu")) &&
					(t.closest(".dropdown") &&
						nt.find(".dropdown-toggle").forEach(function (t) {
							return t.classList.add("active")
						}),
					t.setAttribute("aria-expanded", !0))
				n && n()
			}),
			(t.jQueryInterface = function (e) {
				return this.each(function () {
					var n = L(this, "bs.tab") || new t(this)
					if ("string" == typeof e) {
						if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"')
						n[e]()
					}
				})
			}),
			(t.getInstance = function (t) {
				return L(t, "bs.tab")
			}),
			o(t, null, [
				{
					key: "VERSION",
					get: function () {
						return "5.0.0-alpha2"
					},
				},
			]),
			t
		)
	})()
	V.on(
		document,
		"click.bs.tab.data-api",
		'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
		function (t) {
			t.preventDefault(), (L(this, "bs.tab") || new oe(this)).show()
		}
	)
	var se = E()
	if (se) {
		var re = se.fn.tab
		;(se.fn.tab = oe.jQueryInterface),
			(se.fn.tab.Constructor = oe),
			(se.fn.tab.noConflict = function () {
				return (se.fn.tab = re), oe.jQueryInterface
			})
	}
	var ae = { animation: "boolean", autohide: "boolean", delay: "number" },
		le = { animation: !0, autohide: !0, delay: 5e3 },
		ce = (function () {
			function t(t, e) {
				;(this._element = t),
					(this._config = this._getConfig(e)),
					(this._timeout = null),
					this._setListeners(),
					k(t, "bs.toast", this)
			}
			var e = t.prototype
			return (
				(e.show = function () {
					var t = this
					if (!V.trigger(this._element, "show.bs.toast").defaultPrevented) {
						this._clearTimeout(), this._config.animation && this._element.classList.add("fade")
						var e = function () {
							t._element.classList.remove("showing"),
								t._element.classList.add("show"),
								V.trigger(t._element, "shown.bs.toast"),
								t._config.autohide &&
									(t._timeout = setTimeout(function () {
										t.hide()
									}, t._config.delay))
						}
						if (
							(this._element.classList.remove("hide"),
							w(this._element),
							this._element.classList.add("showing"),
							this._config.animation)
						) {
							var n = g(this._element)
							V.one(this._element, "transitionend", e), _(this._element, n)
						} else e()
					}
				}),
				(e.hide = function () {
					var t = this
					if (
						this._element.classList.contains("show") &&
						!V.trigger(this._element, "hide.bs.toast").defaultPrevented
					) {
						var e = function () {
							t._element.classList.add("hide"), V.trigger(t._element, "hidden.bs.toast")
						}
						if ((this._element.classList.remove("show"), this._config.animation)) {
							var n = g(this._element)
							V.one(this._element, "transitionend", e), _(this._element, n)
						} else e()
					}
				}),
				(e.dispose = function () {
					this._clearTimeout(),
						this._element.classList.contains("show") && this._element.classList.remove("show"),
						V.off(this._element, "click.dismiss.bs.toast"),
						C(this._element, "bs.toast"),
						(this._element = null),
						(this._config = null)
				}),
				(e._getConfig = function (t) {
					return (
						(t = s(
							{},
							le,
							et.getDataAttributes(this._element),
							"object" == typeof t && t ? t : {}
						)),
						v("toast", t, this.constructor.DefaultType),
						t
					)
				}),
				(e._setListeners = function () {
					var t = this
					V.on(this._element, "click.dismiss.bs.toast", '[data-dismiss="toast"]', function () {
						return t.hide()
					})
				}),
				(e._clearTimeout = function () {
					clearTimeout(this._timeout), (this._timeout = null)
				}),
				(t.jQueryInterface = function (e) {
					return this.each(function () {
						var n = L(this, "bs.toast")
						if ((n || (n = new t(this, "object" == typeof e && e)), "string" == typeof e)) {
							if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"')
							n[e](this)
						}
					})
				}),
				(t.getInstance = function (t) {
					return L(t, "bs.toast")
				}),
				o(t, null, [
					{
						key: "VERSION",
						get: function () {
							return "5.0.0-alpha2"
						},
					},
					{
						key: "DefaultType",
						get: function () {
							return ae
						},
					},
					{
						key: "Default",
						get: function () {
							return le
						},
					},
				]),
				t
			)
		})(),
		ue = E()
	if (ue) {
		var he = ue.fn.toast
		;(ue.fn.toast = ce.jQueryInterface),
			(ue.fn.toast.Constructor = ce),
			(ue.fn.toast.noConflict = function () {
				return (ue.fn.toast = he), ce.jQueryInterface
			})
	}
	return {
		Alert: z,
		Button: $,
		Carousel: lt,
		Collapse: gt,
		Dropdown: wt,
		Modal: Ct,
		Popover: Yt,
		ScrollSpy: ee,
		Tab: oe,
		Toast: ce,
		Tooltip: Ut,
	}
})