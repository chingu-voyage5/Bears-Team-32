# Bears-Team-32

## Team Member

- Fabien
- Liviu
- jffy (Project Manager)

## Folder Structure

```
src
 |-- components (for stateless components)
 |-- containers (for stateful components)
```

## API Usage..

### Base URL : https://jffy-api.herokuapp.comapi/v1/spotify/

```
Use together with Spotify end points
https://jffy-api.herokuapp.com/api/v1/spotify/?query={:spotify api}

exmple :
https://jffy-api.herokuapp.com/api/v1/spotify/?query=https://api.spotify.com/v1/tracks/1CkvWZme3pRgbzaxZnTl5X
```

#### Presset endpoints

| End point                                           | Purpose                   | Remark                                              |
| --------------------------------------------------- | ------------------------- | --------------------------------------------------- |
| /api/v1/spotify/featured                            | Get featured list         |
| /api/v1/spotify/search?query={string}&type={string} | Search by query and type  | Available types : album , artist , playlist , track |
| /api/v1/spotify/new-releases                        | Get new releases list     |
| /api/v1/spotify/categories                          | Get categories            |
| /api/v1/spotify/track/{track_id}                    | Get track by id           |
| /api/v1/spotify/playlists/{playlist_id}             | Get playlist by id        |
| /api/v1/spotify/genres                              | Get genres                |
| /api/v1/spotify/categories/{category_id}/playlists  | Get playlists by category |

[![Waffle.io - Columns and their card count](https://badge.waffle.io/chingu-voyage5/Bears-Team-32.svg?columns=all)](https://waffle.io/chingu-voyage5/Bears-Team-32)

Spotify-clone | Voyage-5 | chingu.io
