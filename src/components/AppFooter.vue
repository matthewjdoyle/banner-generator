<script setup lang="ts">
// Footer component with developer attribution
</script>

<template>
  <footer class="bg-white border-t border-neutral-200 mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <!-- Left side - Copyright -->
        <div class="text-center md:text-left">
          <p class="text-neutral-600 text-sm">
            © {{ new Date().getFullYear() }} Banner Generator. All rights reserved.
          </p>
          <p class="text-neutral-500 text-xs mt-1">
            Free to use for personal and commercial projects.
          </p>
        </div>

        <!-- Right side - Built by button -->
        <div class="flex items-center space-x-4">
          <a 
            href="https://www.matthewd0yle.com" 
            target="_blank" 
            rel="noopener noreferrer"
            class="group flex items-center space-x-2 text-white px-4 py-2 rounded-xl font-medium hover:shadow-medium transition-all duration-300 transform hover:scale-105"
            style="background-color: #000F0D"
          >
            <svg class="w-7 h-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="ellipsePath" d="M10,50 A40,25 0 1,1 90,50 A40,25 0 1,1 10,50 Z" />
              </defs>
              <!-- Background circle matching button color -->
              <circle cx="50" cy="50" r="50" fill="#000F0D"/>
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
            <span>Built by M Doyle</span>
            <svg class="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template> 