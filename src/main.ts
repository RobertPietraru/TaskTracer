import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMonstersStore } from './stores/monsters_store'
import { useQuestsStore } from './stores/quests_store'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

var monstersStore = useMonstersStore();
var questsStore = useQuestsStore();

/// initialize game with some quests and monsters (gotta be fun yk)
for (let i = 0; i < 4; i++) {
    monstersStore.create(1);
    questsStore.create(1);
    
}

