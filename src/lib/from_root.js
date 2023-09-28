import { join } from "path"

const ROOT_DIR = process.env.ROOT_DIR ?? process.cwd()

/** @param { string } path */
export const getPath = ( path ) => {
    return join( ROOT_DIR, path )
}