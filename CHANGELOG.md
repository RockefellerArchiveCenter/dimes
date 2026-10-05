# Changelog

## [2.1.1](https://github.com/RockefellerArchiveCenter/dimes/compare/v2.1.0...v2.1.1) (2026-10-05)


### Bug Fixes

* **deps:** Dependency Updates ([644cca0](https://github.com/RockefellerArchiveCenter/dimes/commit/644cca0114d745fa8726f3a25095a95489975d36))
* **deps:** Scheduled dependency updates ([85b4f75](https://github.com/RockefellerArchiveCenter/dimes/commit/85b4f75f6964287f3d8e697f87a02eca0eecae3a))
* **deps:** update to mirador 4.2.6 and mui 9 dependencies ([7bcf308](https://github.com/RockefellerArchiveCenter/dimes/commit/7bcf3085beac99ef349f6b3bd3edac9151e20fe9))

## [2.1.0](https://github.com/RockefellerArchiveCenter/dimes/compare/v2.0.0...v2.1.0) (2026-09-28)


### Features

* add usePageView hook for document titles and Matomo pageviews ([2c30766](https://github.com/RockefellerArchiveCenter/dimes/commit/2c3076644b460b94589d142aa4f756043cfa45b5))


### Bug Fixes

* add MemoryRouter to tests for usePageView ([ebf24a9](https://github.com/RockefellerArchiveCenter/dimes/commit/ebf24a986db5e96de23e44ac3b540c2286876290))
* add search query to site title ([e2d6d34](https://github.com/RockefellerArchiveCenter/dimes/commit/e2d6d3418c3286cb6a1455b029e9ca9d0ca54d9d))
* align page title conventions to improve a11y ([835744b](https://github.com/RockefellerArchiveCenter/dimes/commit/835744b131d2b6f26c246abf3bf6b0f52c5a8bd7))
* **deps:** remove react-helmet ([62bf8bf](https://github.com/RockefellerArchiveCenter/dimes/commit/62bf8bff398f4e88075627f61654a42c0d3783ab))
* follow matomo docs rec for title value ([ddd7122](https://github.com/RockefellerArchiveCenter/dimes/commit/ddd71220a070deb488d6ad314a795c8addebb716))
* initialise search params from the URL before rendering ([bfa2115](https://github.com/RockefellerArchiveCenter/dimes/commit/bfa2115aae24fa3b94713c3e30bc88f6f5e3217b))
* remove the replaced Matomo firePageViewEvent ([3a41adb](https://github.com/RockefellerArchiveCenter/dimes/commit/3a41adbbdea842ab911f689a61a2e2915aa06b87))
* show the correct search results headers for missing values ([fa05ac7](https://github.com/RockefellerArchiveCenter/dimes/commit/fa05ac766f1b2a73ff814a4feaee7442a9cb3724))
* update translation files to align with react-helmet removal ([a4c338f](https://github.com/RockefellerArchiveCenter/dimes/commit/a4c338fbb29008255129c25c4502a9f350873b1c))
* use usePageView hook for page titles and Matomo pageviews ([f4508f2](https://github.com/RockefellerArchiveCenter/dimes/commit/f4508f23d47e9d40dca1d8e42b999693d66d9fd8))

## [2.0.0](https://github.com/RockefellerArchiveCenter/dimes/compare/v1.1.1...v2.0.0) (2026-09-22)


### ⚠ BREAKING CHANGES

* replace create-react-app with vite

### Bug Fixes

* adjust failing tests that relied on jest behaviour ([ab103a6](https://github.com/RockefellerArchiveCenter/dimes/commit/ab103a600973c3681b203a4cb1f3bcc48f731f6b))


### Build System

* replace create-react-app with vite ([ac4317c](https://github.com/RockefellerArchiveCenter/dimes/commit/ac4317cb0509a6d9a6e93663a211cbbe17eee242))

## [1.1.1](https://github.com/RockefellerArchiveCenter/dimes/compare/v1.1.0...v1.1.1) (2026-09-17)


### Bug Fixes

* restore and update limitations and fees translations ([8ddf35f](https://github.com/RockefellerArchiveCenter/dimes/commit/8ddf35f816a1b4baae9822b57ae723b3a9b6382b))
* update duplication request limit ([1cf3cdd](https://github.com/RockefellerArchiveCenter/dimes/commit/1cf3cddd51c0413fdc47f4a5fdc6e8f884059e1f))

## [1.1.0](https://github.com/RockefellerArchiveCenter/dimes/compare/v1.0.2...v1.1.0) (2026-09-16)


### Features

* Add visual regression testing for agent page ([f982462](https://github.com/RockefellerArchiveCenter/dimes/commit/f98246274a36ed1fa760ceb830fef68d1ccde285))
* use headings in card lists for better screen reader ux ([5ce9a5f](https://github.com/RockefellerArchiveCenter/dimes/commit/5ce9a5fb4bceecae72ffa2bcbff1ab00fb297b8b))


### Bug Fixes

* add focus styles with sufficient contrast to select options ([8cbd2dd](https://github.com/RockefellerArchiveCenter/dimes/commit/8cbd2ddb52326913315250d793cbaf2db63abf28))
* add skip link target to digital object viewer ([d218f8a](https://github.com/RockefellerArchiveCenter/dimes/commit/d218f8aa4227e16c646fa52a67fd94f8bdf6b4cc))
* adjust agent sidebar layout to support text resize to 200% ([39889a6](https://github.com/RockefellerArchiveCenter/dimes/commit/39889a6679aeae7818b6ee3dcdbf0ba7b8a514ce))
* allow confirm modal to scroll at short viewport heights + cleanup ([b9dc386](https://github.com/RockefellerArchiveCenter/dimes/commit/b9dc386b0c35bf720d5d41e481b71bc8b2b66844))
* apply focus outline to whole child item button, not just title ([dfb8d9a](https://github.com/RockefellerArchiveCenter/dimes/commit/dfb8d9a2009b124875e4557da4a688a81593f0f5))
* build hrefs via same-origin helper ([7ca53b0](https://github.com/RockefellerArchiveCenter/dimes/commit/7ca53b0e173aa1677ca27ae128c9220e1a79ceeb))
* correctly move focus to form errors so they're announced ([7a26e7e](https://github.com/RockefellerArchiveCenter/dimes/commit/7a26e7e493377613d91435e755147b4a137f2a5e))
* don't hide search controls and remove * from search label ([1f67faf](https://github.com/RockefellerArchiveCenter/dimes/commit/1f67fafb05c2b83eb6862977fe897b2be02b99a0))
* don't let new mylist semantics (ul and h3) impact UI styles ([e075411](https://github.com/RockefellerArchiveCenter/dimes/commit/e075411388cae57e2fa6eaf449f1fe95809800d9))
* don't remove default keyboard focus styles for object titles, only collection titles ([528bf61](https://github.com/RockefellerArchiveCenter/dimes/commit/528bf61cc33c1fc6e3f3e874379c7c228f1bb59b))
* generate unique link/button labels and use &lt;ul&gt; for mylist items ([416a305](https://github.com/RockefellerArchiveCenter/dimes/commit/416a3055c46f61ff709b285d66476b19a87e09b2))
* hide skeleton markup from screenreader and replace with loading msg ([ee8c77a](https://github.com/RockefellerArchiveCenter/dimes/commit/ee8c77a9f4f2e88c4cbe5ab2d6f6e067beef8a30))
* Improve view/list object btn labels with arialabelledby ([bf52245](https://github.com/RockefellerArchiveCenter/dimes/commit/bf52245648c5bb90375a76d14e67d9a174dc730d))
* indicate required form fields and associate help/error text ([6d5a7af](https://github.com/RockefellerArchiveCenter/dimes/commit/6d5a7af0cb4c3b522cf3eb256d3c4cc69bf4c883))
* support minimap modal access for zoom/small screens. ([f48cf27](https://github.com/RockefellerArchiveCenter/dimes/commit/f48cf27422910468a3b74304a4693fe5af75250c))
* wrap agent attributes on sm screen ([e7e85b4](https://github.com/RockefellerArchiveCenter/dimes/commit/e7e85b4d74dfb907ab7728cb14817415ce6b2e19))
* wrap agent id button text ([4c6df57](https://github.com/RockefellerArchiveCenter/dimes/commit/4c6df57d4e6a0f019a7447dd4f49f8bec704ac11))

## [1.0.2](https://github.com/RockefellerArchiveCenter/dimes/compare/v1.0.1...v1.0.2) (2026-08-03)


### Bug Fixes

* **deps:** Dependency Updates ([0988e83](https://github.com/RockefellerArchiveCenter/dimes/commit/0988e8303cdd0513898ea6cac0b22bd87c013a74))
* **deps:** Scheduled dependency updates ([c98a38d](https://github.com/RockefellerArchiveCenter/dimes/commit/c98a38ddade495d301c0e56648ef15eb75673643))
* **deps:** Scheduled dependency updates ([c98a38d](https://github.com/RockefellerArchiveCenter/dimes/commit/c98a38ddade495d301c0e56648ef15eb75673643))
* **deps:** Scheduled dependency updates ([0988e83](https://github.com/RockefellerArchiveCenter/dimes/commit/0988e8303cdd0513898ea6cac0b22bd87c013a74))
* **deps:** Scheduled dependency updates ([636bc46](https://github.com/RockefellerArchiveCenter/dimes/commit/636bc46ea3c7066b158e4d817f44875b0b32c763))

## [1.0.1](https://github.com/RockefellerArchiveCenter/dimes/compare/v1.0.0...v1.0.1) (2026-06-18)


### Bug Fixes

* don't set null value for wikidata data ([aca3aaf](https://github.com/RockefellerArchiveCenter/dimes/commit/aca3aaff5fb723beb7daf4440850fce2f96175b3))
* Don't set null values for Wikidata data ([e8ac987](https://github.com/RockefellerArchiveCenter/dimes/commit/e8ac9877b118a4bf4910e3a51bbf55855795c4ff))
* update deploys ([33d822a](https://github.com/RockefellerArchiveCenter/dimes/commit/33d822a1211ea0316dad290c4d9374c769146890))
* update workflows ([39d8dd9](https://github.com/RockefellerArchiveCenter/dimes/commit/39d8dd92b4f056078fa17f8726d126e2a34c954f))
* update workflows ([39d8dd9](https://github.com/RockefellerArchiveCenter/dimes/commit/39d8dd92b4f056078fa17f8726d126e2a34c954f))
* update workflows ([33d822a](https://github.com/RockefellerArchiveCenter/dimes/commit/33d822a1211ea0316dad290c4d9374c769146890))

## 1.0.0 (2026-05-31)


### Features

* put minimap btn and context switcher in &lt;nav&gt; ([8f6f5b0](https://github.com/RockefellerArchiveCenter/dimes/commit/8f6f5b0de2d916ee0ccb5ad3ff1762f5c0b95e89))


### Bug Fixes

* add aria-labels to secondary nav landmarks ([bf3067f](https://github.com/RockefellerArchiveCenter/dimes/commit/bf3067fdf535799033e4b49b1a6db8c235044499))
* display agent note correctly ([597127f](https://github.com/RockefellerArchiveCenter/dimes/commit/597127ff7bc872fac07a0fe95882fe843a92394a))
* display RAC agent note correctly ([7673fb9](https://github.com/RockefellerArchiveCenter/dimes/commit/7673fb979a12a8c0e72fea412c54c196e2771722))
* don't cover footer content with sticky context switcher ([a96e98d](https://github.com/RockefellerArchiveCenter/dimes/commit/a96e98d877b8ee739c78f883e27f8d8544d115e9))
* don't rely on null for AgentNote source ([987b664](https://github.com/RockefellerArchiveCenter/dimes/commit/987b66474ee37e65086eed8823142acb11044c74))
* re-stick context switcher and minimap btn ([5b3c914](https://github.com/RockefellerArchiveCenter/dimes/commit/5b3c914c79d0d291bb8f1374b7867ae96c779042))
