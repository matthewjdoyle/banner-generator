<script setup lang="ts">
// About page for the Banner Generator
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 pt-16">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <h1 class="text-4xl lg:text-5xl font-bold text-gradient mb-6 font-display">
            About Banner Generator
          </h1>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            A simple, free tool for making good-looking banners. Easy to use and gets the job done.
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div
            class="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100"
          >
            <div
              class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4"
            >
              <span class="text-white text-xl">🎨</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">Make it!</h3>
            <p class="text-neutral-600">
              Make banners that look great with simple tools and templates.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100"
          >
            <div
              class="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4"
            >
              <span class="text-white text-xl">⚡</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">Quick & Easy</h3>
            <p class="text-neutral-600">
              No downloads or sign-ups needed. Just open and start making banners.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100"
          >
            <div
              class="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4"
            >
              <span class="text-white text-xl">💎</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">FREE</h3>
            <p class="text-neutral-600">Everything is free to use. No costs or limits.</p>
          </div>

          <div
            class="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100"
          >
            <div
              class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4"
            >
              <span class="text-white text-xl">📐</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">Sizes for ALL Platforms</h3>
            <p class="text-neutral-600">
              Make banners for social media, websites, or any size you need.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100"
          >
            <div
              class="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4"
            >
              <span class="text-white text-xl">🖼️</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">Customise!</h3>
            <p class="text-neutral-600">
              Add text, images, and icons on your banners. Change colours and styles as you like.
            </p>
          </div>

          <div
            class="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100"
          >
            <div
              class="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4"
            >
              <span class="text-white text-xl">🎯</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3">Helpful Features</h3>
            <p class="text-neutral-600">
              Random generator, undo/redo, and easy export options to make things simpler.
            </p>
          </div>
        </div>

        <!-- Developer Section -->
        <div
          class="bg-white rounded-2xl p-8 lg:p-12 shadow-soft border border-neutral-100 text-center"
        >
          <h2 class="text-3xl font-bold text-neutral-900 mb-4 font-display">
            Built by Dr M Doyle
          </h2>
          <p class="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            I made this banner generator to help people create and customize great-looking banners
            without the hassle. Hope you find it useful!
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.matthewd0yle.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-white px-8 py-4 rounded-xl font-semibold hover:shadow-strong transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
              style="background-color: #000f0d"
            >
              <svg
                class="w-6 h-6"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <path id="ellipsePath" d="M10,50 A40,25 0 1,1 90,50 A40,25 0 1,1 10,50 Z" />
                </defs>
                <!-- Background circle matching button color -->
                <circle cx="50" cy="50" r="50" fill="#000F0D" />
                <g transform="rotate(45 50 50)">
                  <ellipse cx="50" cy="50" rx="40" ry="25" stroke="#9B5DE5" stroke-width="6" />
                  <!-- Central Diamond Dots -->
                  <circle cx="43" cy="50" r="7" fill="#9B5DE5" />
                  <circle cx="50" cy="43" r="7" fill="#05e68c" />
                  <circle cx="57" cy="50" r="7" fill="#9B5DE5" />
                  <circle cx="50" cy="57" r="7" fill="#05e68c" />

                  <!-- Outer Extrema Dots with Animation along path -->
                  <circle r="5" fill="#fde725">
                    <animateMotion
                      dur="20.4s"
                      repeatCount="indefinite"
                      keyPoints="0;0;0.5;0.5;0;0"
                      keyTimes="0;0.14706;0.15686;0.64706;0.65686;1"
                    >
                      <mpath href="#ellipsePath" />
                    </animateMotion>
                  </circle>
                  <circle r="5" fill="#fde725">
                    <animateMotion
                      dur="20.4s"
                      repeatCount="indefinite"
                      keyPoints="0.5;0.5;1;1;0.5;0.5"
                      keyTimes="0;0.14706;0.15686;0.64706;0.65686;1"
                    >
                      <mpath href="#ellipsePath" />
                    </animateMotion>
                  </circle>
                </g>
              </svg>
              <span>Visit My Website</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <a
              href="https://ko-fi.com/matthewjdoyle"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:shadow-strong transition-all duration-300 transform hover:scale-105"
            >
              <img
                src="/support-me-on-ko-fi.png"
                alt="Support me on Ko-fi"
                class="h-12 rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-200"
              />
            </a>
          </div>
        </div>

        <!-- Technical Details -->
        <div
          class="mt-16 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-8 border border-neutral-200"
        >
          <h3 class="text-2xl font-bold text-neutral-900 mb-6 text-center font-display">
            Technical Details
          </h3>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-lg font-semibold text-neutral-800 mb-3">Built With</h4>
              <ul class="space-y-2 text-neutral-600">
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Vue.js 3 with Composition API</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>TypeScript for type safety</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Tailwind CSS for styling</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>HTML5 Canvas for rendering</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Pinia for state management</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold text-neutral-800 mb-3">Features</h4>
              <ul class="space-y-2 text-neutral-600">
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Real-time canvas rendering</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Drag and drop editing</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Undo/Redo functionality</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Multiple export formats</span>
                </li>
                <li class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Accessibility support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
