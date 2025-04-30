import {PhonebookPage} from "@/pages/phonebook/phonebookPage.tsx";
import {AutoTranslationProvider} from "@/contexts/AutoTranslationContext.tsx";
import {StorageProvider} from "@/contexts/StorageContext.tsx";
import {ThemeProvider} from "@/contexts/ThemeContext.tsx";

function App() {

    return (
        <StorageProvider>
            <AutoTranslationProvider>
                <ThemeProvider>
                    <div className="flex flex-col items-center justify-center min-h-svh">
                        <PhonebookPage></PhonebookPage>
                    </div>
                </ThemeProvider>
            </AutoTranslationProvider>
        </StorageProvider>
    )
}

export default App
