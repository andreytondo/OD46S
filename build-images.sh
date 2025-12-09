#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE_TAG="${1:-local}"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required to build images" >&2
  exit 1
fi

mapfile -t DOCKERFILES < <(find "${ROOT_DIR}" -type f \( -name 'Dockerfile' -o -name 'Dockerfile.*' \))

if [[ ${#DOCKERFILES[@]} -eq 0 ]]; then
  echo "No Dockerfiles found under ${ROOT_DIR}" >&2
  exit 1
fi

for dockerfile in "${DOCKERFILES[@]}"; do
  context_dir="$(dirname "${dockerfile}")"
  image_name="$(basename "${context_dir}")"
  tag="${image_name}:${IMAGE_TAG}"

  echo "Building ${tag} from ${dockerfile}"
  docker build -f "${dockerfile}" -t "${tag}" "${context_dir}"
done

echo "Done. Images tagged with :${IMAGE_TAG}"
