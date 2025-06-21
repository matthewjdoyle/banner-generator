<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-neutral-200/50 z-50 shadow-soft">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-strong transition-all duration-300 group-hover:scale-110 bg-white border border-primary-200">
            <svg class="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="ellipsePath" d="M10,50 A40,25 0 1,1 90,50 A40,25 0 1,1 10,50 Z" />
              </defs>
              <g transform="rotate(45 50 50)">
                <ellipse cx="50" cy="50" rx="40" ry="25" stroke="#9B5DE5" stroke-width="6"/>
                <!-- Central Diamond Dots -->
                <circle cx="43" cy="50" r="7" fill="#9B5DE5"/> 
                <circle cx="50" cy="43" r="7" fill="#05e68c"/>
                <circle cx="57" cy="50" r="7" fill="#9B5DE5"/>
                <circle cx="50" cy="57" r="7" fill="#05e68c"/>
                
                <!-- Outer Extrema Dots with Animation along path -->
                <circle r="5" fill="#fde725">
                  <animateMotion 
                    dur="20.4s" 
                    repeatCount="indefinite" 
                    keyPoints="0;0;0.5;0.5;0;0" 
                    keyTimes="0;0.14706;0.15686;0.64706;0.65686;1"
                  >
                    <mpath href="#ellipsePath"/>
                  </animateMotion>
                </circle>
                <circle r="5" fill="#fde725">
                  <animateMotion 
                    dur="20.4s" 
                    repeatCount="indefinite" 
                    keyPoints="0.5;0.5;1;1;0.5;0.5" 
                    keyTimes="0;0.14706;0.15686;0.64706;0.65686;1"
                  >
                    <mpath href="#ellipsePath"/>
                  </animateMotion>
                </circle>
              </g>
            </svg>
          </div>
          <span class="font-display font-bold text-xl text-neutral-900 group-hover:text-gradient transition-all duration-300">Banner Generator</span>
        </RouterLink>

        <nav class="hidden md:flex items-center space-x-8">
          <RouterLink 
            to="/" 
            class="text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-neutral-50"
            active-class="text-primary-600 bg-primary-50"
          >
            Generator
          </RouterLink>
          <RouterLink 
            to="/gallery" 
            class="text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-neutral-50"
            active-class="text-primary-600 bg-primary-50"
          >
            Gallery
          </RouterLink>
          <RouterLink 
            to="/about" 
            class="text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-neutral-50"
            active-class="text-primary-600 bg-primary-50"
          >
            About
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template> 