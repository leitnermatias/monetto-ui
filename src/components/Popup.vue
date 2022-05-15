<script setup>
</script>

<template>
    <div class="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full flex justify-center items-center ease-in duration-300">
        <div 
        class="bg-white w-1/2 h-2/3 flex flex-col items-center rounded-xl border-2 shadow-lg border-orange-100 after:animate-pulse"
        >
            <div class="w-full h-1/6 z-40">
                <slot name="title"></slot>
            </div>
            <div class="h-full w-full overflow-y-scroll">
                <slot name="body"></slot>
            </div>
            <div class="flex justify-around gap-1 w-full h-1/6 items-center">
                <slot name="buttons">
                    <button @click="$emit('cancel')" class="bg-white w-1/4 h-2/3 rounded shadow border-2 border-red-500 hover:border-orange-300">Cancel</button>
                    <button @click="$emit('accept')" class="bg-white w-1/4 h-2/3 rounded shadow border-2 border-blue-500 hover:border-orange-300">Accept</button>
                </slot>
            </div>
        </div>
    </div>
</template>