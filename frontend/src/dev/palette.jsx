import {Fragment} from "react"
import {
    Category,
    Component,
    Variant,
    Palette,
} from "@react-buddy/ide-toolbox"
import AntdPalette from "@react-buddy/palette-antd";
import Loading from "../Components/Loading/Loading";

export const PaletteTree = () => (
    <Palette>
        <Category name="App">
            <Component name="Loader">
                <Variant>
                    <ExampleLoaderComponent/>
                </Variant>
            </Component>
        </Category>
        <AntdPalette/>
    </Palette>
)

export function ExampleLoaderComponent() {
    return (
        <Fragment><Loading/></Fragment>
    )
}