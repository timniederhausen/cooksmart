// Copyright 2020 Felix Burk, Tim Niederhausen
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package org.planqk.cooksmart.util

import org.springframework.data.domain.Page

data class SimplePageable(
        val page: Int = 0,
        val size: Int = 0,
        val sort: List<String> = emptyList()
)

data class SimplePage<T>(
        val page: Int = 0,
        val totalPages: Int = 0,
        val first: Boolean = true,
        val last: Boolean = true,
        val size: Int = 0,
        val totalElements: Long = 0,
        val pageable: SimplePageable = SimplePageable(),
        val content: List<T> = emptyList()
)

fun <T> of(page: Page<T>): SimplePage<T> {
    return SimplePage(
            page = page.number,
            totalPages = page.totalPages,
            first = page.isFirst,
            last = page.isLast,
            size = page.size,
            totalElements = page.totalElements,
            pageable = SimplePageable(
                    page = page.number,
                    size = page.size,
                    sort = page.sort.map { o -> "${o.property},${o.direction}" }.toList()
            ),
            content = page.content
    )
}
