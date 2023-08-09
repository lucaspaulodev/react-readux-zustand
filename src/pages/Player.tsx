import { Header } from "../components/Header";
import { VideoPlayer } from "../components/VideoPlayer";
import { Module } from "../components/Module";
import { useAppDispatch, useAppSelector } from "../store";
import { getCourse, useCurrentLesson } from "../store/slices/player";
import { useEffect } from "react";

export function Player() {
    const dispatch = useAppDispatch()
    const modules = useAppSelector(state => state.player.course?.modules)

    const {currentLesson} = useCurrentLesson()

    useEffect(() => {
        dispatch(getCourse())
    }, [])

    useEffect(() => {
        document.title = `Watching: ${currentLesson?.title}`
    }, [])

    return (
        <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
            <div className="flex w-[1100px] flex-col gap-6">
                <Header/>
                <main className="relative flex rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shadow pr-80">
                    <div className="flex-1">
                        <VideoPlayer />
                    </div>
                    <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 ">
                        {modules?.map((module, index) => {
                            return (
                                <Module key={module.id} moduleIndex={index} title={module.title} amoutOfLessons={module.lessons.length}/>
                            )
                        })}
                    </aside>
                </main>
            </div>
        </div>
    )
}